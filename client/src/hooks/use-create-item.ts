// src/hooks/use-create-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPost } from '../lib/api';
import type { Status, ItemType } from '../types';

interface CreateItemInput {
  title: string;
  type: ItemType;
  authors: string;
  deadline: string;
  status: Status;
}

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemInput) => apiPost('/items', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
