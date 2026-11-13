import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putPei } from '../../services/PeiServiceMock';

export function useUpdatePei(id) {
    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: (payload) => putPei(id, payload),
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['peis', id]});
            queryCliente.invalidateQueries({queryKey: ['peis']});
            console.log('PEI atualizado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao atualizar PEI:', error.response?.data || error.message || error);
        }
    })
}