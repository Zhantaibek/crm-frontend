import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsApi.getById(id),
  });
};