import { useQuery } from '@tanstack/react-query';
import { getEstudoCaso } from '../../services/EstudoCasoService';

export function useGetEstudoCaso(id) {
    return useQuery({
        queryKey: ['estudo-de-caso', id],
        queryFn: () => getEstudoCaso(id),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}