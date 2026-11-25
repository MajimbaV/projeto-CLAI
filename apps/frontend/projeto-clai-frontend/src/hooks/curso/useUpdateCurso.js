import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putCurso } from '../../services/CursoService';

export function useUpdateCurso(id) {
    const queryCliente = useQueryClient();

    return useMutation({
        mutationFn: (data) => putCurso(id, data),
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['cursos']});
            queryCliente.invalidateQueries({queryKey: ['cursos', id]});
            console.log('Curso atualizado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao atualizar curso:', error.response?.data);
        }
    })
}