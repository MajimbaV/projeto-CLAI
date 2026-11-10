import { useQuery } from '@tanstack/react-query';
import { getEstudosCaso } from '../../services/EstudoCasoService';

export function useGetEstudosCaso({page = 1, size = 10, sort = 'id,asc', filters} = {}) {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['estudos-de-caso', page, size, sort, filters],
        queryFn: () => getEstudosCaso({
            page: page - 1, 
            size: size, 
            sort: sort, 
            filters: filters
        }),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev 
    })
}