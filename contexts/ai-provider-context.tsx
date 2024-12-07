"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PromptType } from "@/lib/prompts";

type AIProvider = 'groq' | 'openai';
type StorageProvider = 'minio' | 'aws';

interface AIProviderContextType {
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
  analysisType: PromptType;
  setAnalysisType: (type: PromptType) => void;
  storageProvider: StorageProvider;
  setStorageProvider: (provider: StorageProvider) => void;
  globalApiKey: string;
  setGlobalApiKey: (key: string) => void;
  groqApiKey: string;
  setGroqApiKey: (key: string) => void;
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
  aiProvider: string;
  apiKey: string;
  setAiProvider: (provider: string) => void;
  setApiKey: (key: string) => void;
}

const AIProviderContext = createContext<AIProviderContextType | undefined>(undefined);

const STORAGE_KEY = '@smart-shopping:ai-settings';

interface StoredSettings {
  provider: AIProvider;
  apiKey: string;
  groqApiKey: string;
  openaiApiKey: string;
  aiProvider: string;
  setAiProvider: (provider: string) => void;
  setApiKey: (key: string) => void;
}

export function AIProviderProvider({ children }: { children: ReactNode }) {
  const [provider, setProviderState] = useState<AIProvider>('groq');
  const [analysisType, setAnalysisType] = useState<PromptType>('menu');
  const [storageProvider, setStorageProvider] = useState<StorageProvider>('minio');
  const [globalApiKey, setGlobalApiKeyState] = useState<string>('');
  const [groqApiKey, setGroqApiKeyState] = useState<string>('');
  const [openaiApiKey, setOpenaiApiKeyState] = useState<string>('');

  const [aiProvider, setAiProvider] = useState<string>('Groq Ai');
  const [apiKey, setApiKey] = useState<string>('');

  // Carrega as configurações do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
          try {
            const settings = JSON.parse(savedSettings) as StoredSettings;
            if (settings && typeof settings === 'object') {
              setProviderState(settings.provider || 'groq');
              setGlobalApiKeyState(settings.apiKey || '');
              setGroqApiKeyState(settings.groqApiKey || '');
              setOpenaiApiKeyState(settings.openaiApiKey || '');
            } else {
              throw new Error('Formato inválido');
            }
          } catch {
            const defaultSettings: StoredSettings = {
              provider: 'groq',
              apiKey: '',
              groqApiKey: '',
              openaiApiKey: '',
              aiProvider: 'Groq Ai',
              setAiProvider: () => {},
              setApiKey: () => {}
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        const defaultSettings: StoredSettings = {
          provider: 'groq',
          apiKey: '',
          groqApiKey: '',
          openaiApiKey: '',
          aiProvider: 'Groq Ai',
          setAiProvider: () => {},
          setApiKey: () => {}
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
      }
    }
  }, []);

  // Função para salvar todas as configurações
  const saveSettings = (newSettings: Partial<StoredSettings>) => {
    if (typeof window !== 'undefined') {
      const currentSettings = {
        provider,
        apiKey: globalApiKey,
        groqApiKey,
        openaiApiKey
      };
      const updatedSettings = { ...currentSettings, ...newSettings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
    }
  };

  const setProvider = (newProvider: AIProvider) => {
    setProviderState(newProvider);
    saveSettings({ provider: newProvider });
  };

  const setGlobalApiKey = (key: string) => {
    setGlobalApiKeyState(key);
    saveSettings({ apiKey: key });
  };

  const setGroqApiKey = (key: string) => {
    setGroqApiKeyState(key);
    saveSettings({ groqApiKey: key });
  };

  const setOpenaiApiKey = (key: string) => {
    setOpenaiApiKeyState(key);
    saveSettings({ openaiApiKey: key });
  };

  return (
    <AIProviderContext.Provider value={{ 
      provider, 
      setProvider, 
      analysisType, 
      setAnalysisType,
      storageProvider,
      setStorageProvider,
      globalApiKey,
      setGlobalApiKey,
      groqApiKey,
      setGroqApiKey,
      openaiApiKey,
      setOpenaiApiKey,
      aiProvider, apiKey, setAiProvider, setApiKey
    }}>
      {children}
    </AIProviderContext.Provider>
  );
}

export function useAIProvider() {
  const context = useContext(AIProviderContext);
  if (context === undefined) {
    throw new Error('useAIProvider must be used within a AIProviderProvider');
  }
  return context;
} 