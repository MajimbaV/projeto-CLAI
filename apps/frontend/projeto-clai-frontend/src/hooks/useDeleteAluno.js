import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAluno } from '../services/AlunoService';

export function useDeleteAluno() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matricula) => deleteAluno(matricula),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['alunos']});
            console.log('Aluno deletado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao deletar aluno:', error.response?.data);
        }
    })
}