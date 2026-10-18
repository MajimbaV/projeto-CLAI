import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putAluno } from '../services/AlunoService';

export function useUpdateAluno(id) {
    const queryCliente = useQueryClient();

    return useMutation({
        mutationFn: (data) => putAluno(id, data),
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['alunos']});
            console.log('Aluno atualizado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao atualizar aluno:', error.response?.data);
        }
    })
}