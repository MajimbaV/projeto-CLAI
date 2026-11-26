import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ativarCurso } from '../../services/CursoService';

export function useAtivarCurso(id) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => ativarCurso(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['cursos']});
            queryClient.invalidateQueries({queryKey: ['cursos', id]});
            console.log('Curso ativado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao ativar curso:', error.response?.data);
        }
    })
}