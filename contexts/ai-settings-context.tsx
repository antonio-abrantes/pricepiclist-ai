"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AISettingsContextType {
  aiProvider: string;
  apiKey: string;
  setAiProvider: (provider: string) => void;
  setApiKey: (key: string) => void;
}

const AISettingsContext = createContext<AISettingsContextType | undefined>(undefined);

const STORAGE_KEY = "@smart-shopping:ai-settings";

export function AISettingsProvider({ children }: { children: ReactNode }) {
  const [aiProvider, setAiProvider] = useState<string>('Groq Ai');
  const [apiKey, setApiKey] = useState<string>('');

  // useEffect(() => {
  //   const storedSettings = localStorage.getItem(STORAGE_KEY);
  //   if (storedSettings) {
  //     const { aiProvider: savedProvider, apiKey: savedKey } = JSON.parse(storedSettings);
  //     setAiProvider(savedProvider);
  //     setApiKey(savedKey);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify({ aiProvider, apiKey }));
  // }, [aiProvider, apiKey]);

  return (
    <AISettingsContext.Provider value={{ aiProvider, apiKey, setAiProvider, setApiKey }}>
      {children}
    </AISettingsContext.Provider>
  );
}

export function useAISettings() {
  const context = useContext(AISettingsContext);
  if (!context) {
    throw new Error("useAISettings must be used within an AISettingsProvider");
  }
  return context;
} 