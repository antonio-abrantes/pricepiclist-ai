import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Profile {
  name: string;
  email: string;
  cpf: string;
  ddd: string;
  phone: string;
  avatarUrl: string;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  resetProfile: () => void;
}

const initialProfile: Profile = {
  name: '',
  email: '',
  cpf: '',
  ddd: '',
  phone: '',
  avatarUrl: '',
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: initialProfile,
      
      updateProfile: (data) => 
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        })),
      
      resetProfile: () => 
        set(() => ({
          profile: initialProfile,
        })),
    }),
    {
      name: '@smart-shopping:profile',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// Função auxiliar para debug
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.clearProfile = () => localStorage.removeItem('@smart-shopping:profile');
} 