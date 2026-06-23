// src/hooks/use-items.ts
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../lib/api';

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: () => apiGet('/items'),
  });
};
