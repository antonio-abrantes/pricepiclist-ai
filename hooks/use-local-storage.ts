import { useState, useEffect } from 'react';

type StorageKey = '@smart-shopping:lists' | '@smart-shopping:ai-settings';

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {
  // Estado para controlar se está no cliente
  const [isClient, setIsClient] = useState(false);
  
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Efeito para carregar dados do localStorage apenas no cliente
  useEffect(() => {
    setIsClient(true);
    
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return;
      }

      const parsed = JSON.parse(item);
      if (Array.isArray(parsed)) {
        setStoredValue(parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })) as T);
      } else {
        setStoredValue(parsed as T);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
  }, [key]);

  // Efeito para sincronizar com localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setStoredValue] as const;
}

// Funções auxiliares para operações diretas no localStorage
export const storage = {
  save: <T>(key: StorageKey, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  },

  get: <T>(key: StorageKey, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsed = JSON.parse(item);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })) as T;
      }
      
      return parsed as T;
    } catch (error) {
      console.error('Erro ao recuperar:', error);
      return defaultValue;
    }
  },

  remove: (key: StorageKey): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
    }
  }
}; 