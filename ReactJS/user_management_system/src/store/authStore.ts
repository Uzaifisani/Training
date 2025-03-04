import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: (token, email) => set({ isAuthenticated: true, token, user: { email } }),
      logout: () => set({ isAuthenticated: false, token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);