// hooks/use-publish-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatch } from '../lib/api';

export const usePublishItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiPatch(`/items/${id}/status`, { status: 'PUBLISHED' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
