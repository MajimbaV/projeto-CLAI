import { useQuery } from '@tanstack/react-query';
import { getPlanosAcao } from '../../services/PlanoAcaoService';

export function useGetPlanosAcaoByMatricula(matriculaAluno, {page = 1, size = 10, sort = 'id,asc', filters} = {}) {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['planos-acao', 'matricula', matriculaAluno, page, size, sort, filters],
        enabled: Boolean(matriculaAluno),
        queryFn: () => getPlanosAcao({
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