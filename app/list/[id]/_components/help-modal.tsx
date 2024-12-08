import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como usar a captura inteligente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Passo 1: Captura da Imagem</h3>
            <p className="text-sm text-muted-foreground">
              Clique em "Tirar Foto" para usar a câmera do dispositivo ou selecionar uma imagem existente. Procure capturar a etiqueta ou cartaz do preço com boa iluminação e foco.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Passo 2: Processamento</h3>
            <p className="text-sm text-muted-foreground">
              Após selecionar a imagem, clique em "Gravar e Analisar". Nossa IA irá processar a imagem e extrair automaticamente o nome do produto e o preço.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Dicas para melhor resultado</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
              <li>Mantenha a câmera estável ao fotografar</li>
              <li>Certifique-se que o preço e nome do produto estejam legíveis</li>
              <li>Evite reflexos e sombras na imagem</li>
              <li>Quanto mais nítida a foto, melhor será a análise</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 