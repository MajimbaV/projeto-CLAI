import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putEstudoCaso } from '../../services/EstudoCasoService';

export function useUpdateEstudoCaso(id) {
    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: (payload) => putEstudoCaso(id, payload),
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['estudos-de-caso']});
            console.log('Estudo de caso atualizado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao atualizar estudo de caso:', error.response?.data || error.message || error);
        }
    })
}