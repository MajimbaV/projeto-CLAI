import { useQuery } from '@tanstack/react-query';
import { getPeiById } from '../../services/PeiServiceMock';

export function useGetPei(id) {
    return useQuery({
        queryKey: ['peis', id],
        queryFn: () => getPeiById(id),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev 
    })
}