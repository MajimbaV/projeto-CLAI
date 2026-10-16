import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAluno } from '../services/AlunoService';

export function useCreateAluno() {
    const queryCliente = useQueryClient();

    return useMutation({
        mutationFn: postAluno,
        onSuccess: () => {
            queryCliente.invalidateQueries('alunos');
        },
        onError: (error) => {
            console.error('Erro ao criar aluno:', error.response?.data);
        }
    })
}