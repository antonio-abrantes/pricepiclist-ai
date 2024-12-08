"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Profile {
  name: string;
  email: string;
  cpf: string;
  ddd: string;
  phone: string;
  avatarUrl: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = '@smart-shopping:user-settings';

const initialProfile: Profile = {
  name: '',
  email: '',
  cpf: '',
  ddd: '',
  phone: '',
  avatarUrl: '',
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialProfile;
        }
      }
    }
    return initialProfile;
  });

  const updateProfile = (data: Partial<Profile>) => {
    const newProfile = { ...profile, ...data };
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
  };

  const resetProfile = () => {
    setProfile(initialProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      resetProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 