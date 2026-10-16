import { useQuery } from '@tanstack/react-query';
import { getAlunos } from '../services/AlunoService';

export function useGetAlunos() {
    return useQuery({
        queryKey: ['alunos'],
        queryFn: getAlunos,
        staleTime: 5 * 60 * 1000, // 5 minutos
    })
}