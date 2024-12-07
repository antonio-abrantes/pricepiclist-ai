"use client"

import { useState } from 'react'
import { Camera, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductForm } from './product-form'
import { useList } from '@/contexts/list-context'
import { compressAndConvertToJpeg } from "@/lib/image-utils"
import { toast } from 'sonner'
import { useAIProvider } from '@/contexts/ai-provider-context'
import { ApiKeyWarningModal } from './api-key-warning-modal'
const MAX_IMAGE_SIZE_MB = 1;

export function ListActions() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { addProduct } = useList()

  const { provider, analysisType, storageProvider, globalApiKey, groqApiKey, openaiApiKey } = useAIProvider();
  const [status, setStatus] = useState<
    "initial" | "uploading" | "parsing" | "created" | "error"
  >("initial");
  const [menuUrl, setMenuUrl] = useState<string | undefined>(undefined);
  const [priceObject, setPriceObject] = useState<{ name: string; price: string } | undefined>(undefined);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);
  const [needsNewUpload, setNeedsNewUpload] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isApiKeyWarningOpen, setIsApiKeyWarningOpen] = useState(false);

  const resetForm = () => {
    setSelectedFile(null);
    setMenuUrl(undefined);
    setStatus("initial");
    setPriceObject(undefined);
    setUploadedImageUrl(undefined);
    setNeedsNewUpload(true);
    setIsCompressing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setNeedsNewUpload(true);
      setStatus("initial");
      setPriceObject(undefined);
      setMenuUrl(undefined);
      setIsCompressing(false);
    }
  }

  const handleProductSubmit = (product: { productName: string; price: number; quantidade: number }) => {
    addProduct(product);
    resetForm();
    setIsFormOpen(false);
  };

  const handleAnalyze = async () => {

    if (!globalApiKey) {
      setIsApiKeyWarningOpen(true);
      return;
    }


    if (selectedFile && !isCompressing) {
      try {
        let storageUrl = uploadedImageUrl;

        if (needsNewUpload) {
          let fileToUpload = selectedFile;
          if (selectedFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            try {
              setIsCompressing(true);
              fileToUpload = await compressAndConvertToJpeg(selectedFile);
              toast.success('Imagem comprimida com sucesso', {
                description: 'A imagem foi comprimida para 1MB para facilitar o upload.',
                duration: 4000,
              });
            } catch (error) {
              setIsCompressing(false);
              toast.error('Erro ao comprimir a imagem', {
                description: 'Por favor, tente novamente.'
              });
              return;
            }
          }

          const objectUrl = URL.createObjectURL(fileToUpload);
          setMenuUrl(objectUrl);
          setStatus("uploading");

          toast.loading('Realizando upload da imagem...', {
            id: 'upload-loading',
            duration: 0,
          });

          const formData = new FormData();
          formData.append("file", fileToUpload);
          formData.append("apiKey", globalApiKey);

          const uploadResponse = await fetch('/api/s3-upload-minio', {
            method: "POST",
            body: formData,
          });

          toast.dismiss('upload-loading');

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.statusText}`);
          }

          const uploadData = await uploadResponse.json();
          console.log('Upload realizado:', {
            timestamp: new Date().toISOString(),
            needsNewUpload,
            uploadData
          });

          if (!uploadData.url) {
            throw new Error("URL not returned by the server");
          }

          storageUrl = uploadData.url;
          setUploadedImageUrl(storageUrl);
          setNeedsNewUpload(false);
        }

        setStatus("parsing");

        toast.loading('Extraindo dados da imagem...', {
          id: 'parsing-loading'
        });

        const endpoint = provider === 'groq' ? '/api/groq-parse' : '/api/openai-parse';

        const providerApiKey = provider === 'groq' ? groqApiKey : openaiApiKey;

        const parseResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: storageUrl,
            analysisType,
            apiKey: globalApiKey,
            providerApiKey
          }),
        });

        toast.dismiss('parsing-loading');

        if (!parseResponse.ok) {
          setStatus("error");
          throw new Error(`Failed to process menu: ${parseResponse.statusText}`);
        }

        const parseData = await parseResponse.json();

        if (!parseData?.choices?.[0]?.message?.content) {
          setStatus("error");
          toast.error('Erro na análise', {
            description: 'A IA não conseguiu extrair informações da imagem. Tente tirar uma nova foto.'
          });
          return;
        }

        let priceObject;
        try {
          priceObject = JSON.parse(parseData.choices[0].message.content);
        } catch (error) {
          setStatus("error");
          toast.error('Erro na análise', {
            description: 'A resposta da IA está em um formato inválido. Tente novamente.'
          });
          return;
        }

        if (!priceObject?.name || !priceObject?.price) {
          setStatus("error");
          toast.error('Dados incompletos', {
            description: 'A IA não conseguiu identificar o nome ou preço do produto. Tente tirar uma nova foto.'
          });
          return;
        }

        setPriceObject(priceObject);
        setIsFormOpen(true);
        setStatus("created");
      } catch (error) {
        setStatus("error");
        toast.error('Erro ao processar a imagem', {
          description: 'Por favor, tente novamente.'
        });
      } finally {
        setIsCompressing(false);
      }
    }
  }

  return (
    <div className="flex gap-4 border-b border-border pb-4">
      <Button asChild style={{ cursor: 'pointer' }}>
        <label>
          <Camera className="mr-2 h-4 w-4" />
          Tirar Foto
          <input
            type="file"
            accept="image/*"
            className="hidden"
            capture="environment"
            onChange={handleFileSelect}
          />
        </label>
      </Button>

      <Button
        onClick={handleAnalyze}
        disabled={!selectedFile}
      >
        <Upload className="mr-2 h-4 w-4" />
        Gravar e Analisar
      </Button>

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleProductSubmit}
        priceObject={priceObject || { name: '', price: '' }}
      />
      <ApiKeyWarningModal
        isOpen={isApiKeyWarningOpen}
        onClose={() => setIsApiKeyWarningOpen(false)}
      />
    </div>
  )
}