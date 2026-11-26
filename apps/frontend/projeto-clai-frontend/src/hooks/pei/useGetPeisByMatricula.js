import { useQuery } from '@tanstack/react-query';
import { getPeis } from '../../services/PeiService';

export function useGetPeisByMatricula(matriculaAluno, {page = 1, size = 10, sort = 'id,asc', filters} = {}) {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['peis', 'matricula', matriculaAluno, page, size, sort, filters],
        enabled: Boolean(matriculaAluno),
        queryFn: () => getPeis({
            page: page - 1, 
            size: size, 
            sort: sort, 
            filters: {
                ...filters,
                matriculaAluno: matriculaAluno
            }
        }),
        staleTime: 5 * 60 * 1000, // 5 minutos
    })
}