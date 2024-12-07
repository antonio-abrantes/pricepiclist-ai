"use client"

import { useState } from 'react'
import { Camera, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductForm } from './product-form'
import { useList } from '@/contexts/list-context'

export function ListActions() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { addProduct } = useList()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      console.log('Arquivo selecionado:', selectedFile)
      setIsFormOpen(true)
    }
  }

  return (
    <div className="flex gap-4 mb-6">
      <Button asChild>
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
        onSubmit={addProduct}
      />
    </div>
  )
}