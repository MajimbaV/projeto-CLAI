import { useMutation, useQueryClient  } from '@tanstack/react-query';
import { postPea } from '../../services/PeaService';

export function useCreatePea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postPea,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['peas'] });
            console.log('Plano de Ensino Acadêmico cadastrado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao cadastrar o Plano de Ensino Acadêmico:', error.response?.data || error.message || error);
        }
    })


}