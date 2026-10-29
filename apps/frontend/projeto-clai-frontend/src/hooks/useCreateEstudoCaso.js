import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postEstudoCaso, postEstudoCasoCombinado } from '../services/EstudoCasoService';

export function useCreateEstudoCaso() {
    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: (payload) => {
            if (payload.aluno && payload.estudoDeCaso) { 
                return postEstudoCasoCombinado(payload);
            }
            return postEstudoCaso(payload);
        },
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['estudos-de-caso']});
            console.log('Estudo de caso criado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao criar estudo de caso:', error.response?.data || error.message || error);
        }
    })
}