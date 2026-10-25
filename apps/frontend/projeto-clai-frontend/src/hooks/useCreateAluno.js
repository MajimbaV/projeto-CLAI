import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAluno } from '../services/AlunoService';

export function useCreateAluno() {
    const queryCliente = useQueryClient();

    return useMutation({
        mutationFn: postAluno,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['alunos']});
            console.log('Aluno criado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao criar aluno:', error.response?.data || error.message || error);
        }
    })
}