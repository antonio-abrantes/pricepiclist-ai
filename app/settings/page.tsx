"use client";

// import { useAISettings } from '@/contexts/ai-settings-context';
import { useAIProvider } from '@/contexts/ai-provider-context';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SettingsPage() {
  // const { aiProvider, setAiProvider, apiKey, setApiKey } = useAISettings();
  const {
    provider,
    setProvider,
    globalApiKey,
    setGlobalApiKey,
    groqApiKey,
    setGroqApiKey,
    openaiApiKey,
    setOpenaiApiKey,
    aiProvider,
    setAiProvider,
    apiKey,
    setApiKey
  } = useAIProvider();

  const [showGlobalKey, setShowGlobalKey] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);

  // Carrega os dados do contexto quando a página é montada
  useEffect(() => {
    const providerValue = provider === 'groq' ? 'Groq Ai' : 'OpenAI';
    setAiProvider(providerValue);
    setApiKey(globalApiKey);
  }, [provider, globalApiKey, setAiProvider, setApiKey]);

  const handleSave = () => {
    console.log('Configurações salvas:', { aiProvider, apiKey });

    const providerValue = aiProvider === 'Groq Ai' ? 'groq' : 'openai';
    setProvider(providerValue);
    setGlobalApiKey(apiKey);
    toast.success('Configurações salvas com sucesso', {
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Mantenha suas configurações e credenciais atualizadas.
        </p>
      </div>
      <div className="container mx-auto p-2">
        <div className="mx-auto bg-card p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>IA Provider</Label>
              <RadioGroup
                value={aiProvider}
                onValueChange={(value) => {
                  setAiProvider(value);
                  setProvider(value === 'Groq Ai' ? 'groq' : 'openai');
                }}
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

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-lg font-semibold">Environments</h2>

              <div className="space-y-2">
                <Label htmlFor="globalApiKey">API Key Global</Label>
                <div className="relative">
                  <Input
                    id="globalApiKey"
                    type={showGlobalKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setGlobalApiKey(e.target.value);
                    }}
                    placeholder="Digite sua API Key Global"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowGlobalKey(!showGlobalKey)}
                  >
                    {showGlobalKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="groqApiKey">Groq API Key</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Caso não tenha a API Key Global, crie sua API Key da Groq em: <a className="hover:underline font-bold font-purple-900" href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">console.groq.com</a></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <Input
                    id="groqApiKey"
                    type={showGroqKey ? "text" : "password"}
                    value={groqApiKey}
                    onChange={(e) => setGroqApiKey(e.target.value)}
                    placeholder="Digite sua Groq API Key"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowGroqKey(!showGroqKey)}
                  >
                    {showGroqKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Caso não tenha a API Key Global, crie sua API Key da OpenAI em: <a className="hover:underline font-bold font-purple-900" href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com</a></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <Input
                    id="openaiApiKey"
                    type={showOpenAIKey ? "text" : "password"}
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                    placeholder="Digite sua OpenAI API Key"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                  >
                    {showOpenAIKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
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