import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCurso } from '../../services/CursoService';

export function useDeleteCurso(id) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCurso(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['cursos']});
            queryClient.invalidateQueries({queryKey: ['cursos', id]});
            console.log('Curso deletado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao deletar curso:', error.response?.data);
        }
    })
}