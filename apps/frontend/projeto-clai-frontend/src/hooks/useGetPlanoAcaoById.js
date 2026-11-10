import { useQuery } from '@tanstack/react-query';
import { getPlanoAcaoById } from '../services/PlanoAcaoService';

export function useGetPlanoAcaoById(id, options = {}) {
  return useQuery({
    queryKey: ['planos-acao', id],
    queryFn: () => getPlanoAcaoById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

