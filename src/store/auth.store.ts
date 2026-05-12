
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  surname : string,
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  setAccessToken: (token) => set({ accessToken: token }),

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('refreshToken');
    set({ user: null, accessToken: null });
  },

  isAuthenticated: () => !!get().accessToken,

  isAdmin: () => get().user?.role === 'admin',
}));