import { client } from './client';
import type { LoginDto, RegisterDto, TokenResponse } from '@/types/auth.types';
import type { User } from '@/types/user.types';

export const authApi = {
  signup: async (data: RegisterDto): Promise<User> => {
    const res = await client.post('/auth/signup', data);
    return res.data;
  },

  login: async (data: LoginDto): Promise<TokenResponse> => {
    const res = await client.post('/auth/login', data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const res = await client.post('/auth/refresh', { refreshToken });
    return res.data;
  },
};