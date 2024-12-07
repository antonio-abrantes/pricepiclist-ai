"use client";

import { useAISettings } from '@/contexts/ai-settings-context';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { aiProvider, setAiProvider, apiKey, setApiKey } = useAISettings();

  const handleSave = () => {
    // Aqui você pode adicionar lógica adicional se necessário
    console.log('Configurações salvas:', { aiProvider, apiKey });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Mantenha seus dados pessoais atualizados.
        </p>
      </div>
      <div className="container mx-auto p-2">
        <div className=" mx-auto bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>IA Provider</Label>
              <RadioGroup
                value={aiProvider}
                onValueChange={setAiProvider}
                className="gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Groq Ai" id="groq" />
                  <Label htmlFor="groq">Groq Ai (Default)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="OpenAI" id="openai" />
                  <Label htmlFor="openai">OpenAI</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Digite sua API Key"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 