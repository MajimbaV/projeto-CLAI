import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPlanoAcao } from '../services/PlanoAcaoService';

export function useCreatePlanoAcao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlanoAcao,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['planos-acao'] });
      console.log('Plano de Ação cadastrado com sucesso!', data);
    },
    onError: (error) => {
      console.error('Erro ao cadastrar Plano de Ação:', error.response?.data || error.message || error);
    },
  });
}

