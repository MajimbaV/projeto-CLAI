import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putPlanoAcao } from '../services/PlanoAcaoService';

export function useUpdatePlanoAcao(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => putPlanoAcao(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['planos-acao'] });
      console.log('Plano de Ação atualizado com sucesso!', data);
    },
    onError: (error) => {
      console.error('Erro ao atualizar Plano de Ação:', error.response?.data || error.message || error);
    },
  });
}

