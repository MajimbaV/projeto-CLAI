import { useQuery } from '@tanstack/react-query';
import { getPlanosAcao } from '../../services/PlanoAcaoService';

export function useGetPlanosAcaoByMatricula(matriculaAluno, {page = 1, size = 10, sort = 'id,asc', filters} = {}) {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['planos-acao', page, size, sort, filters],
        queryFn: () => getPlanosAcao({
            page: page - 1, 
            size: size, 
            sort: sort, 
            filters: {
              matriculaAluno: matriculaAluno,
              ...filters
            }
        }),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev 
    })
}