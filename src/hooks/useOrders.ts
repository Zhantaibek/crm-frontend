import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';
import type { CreateOrderDto } from '@/types/order.types';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getAll,
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders', 'my'],
    queryFn: ordersApi.getMy,
  });
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderDto) => ordersApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ordersApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};