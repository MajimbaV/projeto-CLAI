import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ativarAluno } from '../../services/AlunoService';

export function useAtivarAluno() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matricula) => ativarAluno(matricula),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['alunos']});
            console.log('Aluno ativado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao ativar aluno:', error.response?.data);
        }
    })
}