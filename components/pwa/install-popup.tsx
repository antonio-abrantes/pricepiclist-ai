import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InstallPopupProps {
  isOpen: boolean;
  onInstall: () => void;
  onCancel: () => void;
  onDontAskAgain: (checked: boolean) => void;
}

export function InstallPopup({ isOpen, onInstall, onCancel, onDontAskAgain }: InstallPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instalar Aplicativo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Deseja instalar o PricePicList.AI em seu dispositivo? Você poderá acessá-lo diretamente da sua tela inicial.
          </p>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="dontAsk" onCheckedChange={onDontAskAgain} />
            <Label htmlFor="dontAsk">Não perguntar novamente</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Agora não
          </Button>
          <Button onClick={onInstall}>
            Instalar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 