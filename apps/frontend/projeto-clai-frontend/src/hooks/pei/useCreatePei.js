import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPei } from '../services/PeiService';

export function useCreatePei() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPei,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['peis'] });
      console.log('Plano de Ensino Individual cadastrado com sucesso!', data);
    },
    onError: (error) => {
      console.error('Erro ao cadastrar o Plano de Ensino Individual:', error.response?.data || error.message || error);
    },
  });
}

