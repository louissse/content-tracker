// hooks/use-archive-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatch } from '../lib/api';

export const useArchiveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiPatch(`/items/${id}/archive`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
