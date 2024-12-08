"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { InstallPopup } from '@/components/pwa/install-popup';

interface PWAInstallContextType {
  promptInstall: () => Promise<void>;
}

const PWAInstallContext = createContext<PWAInstallContextType | undefined>(undefined);

const STORAGE_KEY = '@smart-shopping:pwa-settings';

interface PWASettings {
  dontAskAgain: boolean;
  installed: boolean;
}

export function PWAInstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      const savedSettings = localStorage.getItem(STORAGE_KEY);
      const settings: PWASettings = savedSettings 
        ? JSON.parse(savedSettings)
        : { dontAskAgain: false, installed: false };

      if (!settings.dontAskAgain && !settings.installed) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('App instalado com sucesso');
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
          dontAskAgain: true, 
          installed: true 
        }));
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleCancel = () => {
    setShowInstallPrompt(false);
  };

  const handleDontAskAgain = (checked: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      dontAskAgain: checked, 
      installed: false 
    }));
  };

  const promptInstall = async () => {
    if (deferredPrompt) {
      await handleInstall();
    }
  };

  return (
    <PWAInstallContext.Provider value={{ promptInstall }}>
      {children}
      <InstallPopup
        isOpen={showInstallPrompt}
        onInstall={handleInstall}
        onCancel={handleCancel}
        onDontAskAgain={handleDontAskAgain}
      />
    </PWAInstallContext.Provider>
  );
}

export function usePWAInstall() {
  const context = useContext(PWAInstallContext);
  if (!context) {
    throw new Error('usePWAInstall must be used within a PWAInstallProvider');
  }
  return context;
} 