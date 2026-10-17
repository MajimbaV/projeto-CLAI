import { useQuery } from '@tanstack/react-query';
import { getAlunos } from '../services/AlunoService';

export function useGetAlunos(page = 1, size = 10, sort = 'alunoNome,asc') {

    if (page < 1) {
        page = 1;
    }

    return useQuery({
        queryKey: ['alunos', page, size, sort],
        queryFn: () => getAlunos(page - 1, size, sort),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev 
    })
}