import { useQuery } from '@tanstack/react-query';
import { getPeis } from '../../services/PeiServiceMock';

export function useGetPeis({page = 1, size = 10, sort = 'id,asc', filters} = {}) {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['peis', page, size, sort, filters],
        queryFn: () => getPeis({
            page: page - 1, 
            size: size, 
            sort: sort, 
            filters: filters
        }),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev 
    })
}