import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCurso } from "../../services/CursoService";

export function useCreateCurso() {
    const queryCliente = useQueryClient();

    return useMutation({
        mutationFn: postCurso,
        onSuccess: (data) => {
            queryCliente.invalidateQueries({queryKey: ['cursos']});
            console.log('Curso criado com sucesso!', data);
        },
        onError: (error) => {
            console.error('Erro ao criar curso:', error.response?.data || error.message || error);
        }
    });
}