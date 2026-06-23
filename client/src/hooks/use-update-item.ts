// hooks/use-update-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatch } from '../lib/api';
import type { ItemType, Status } from '../types';

interface UpdateItemInput {
  id: number;
  title: string;
  type: ItemType;
  authors: string;
  deadline: string;
  status: Status;
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateItemInput) =>
      apiPatch(`/items/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
