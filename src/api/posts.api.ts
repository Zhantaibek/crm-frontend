import { client } from './client';
import type { Post } from '@/types/post.types';

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const res = await client.get('/posts');
    return res.data;
  },

  getById: async (id: number): Promise<Post> => {
    const res = await client.get(`/posts/${id}`);
    return res.data;
  },
};