import { useQuery } from '@tanstack/react-query';
import { getAlunoByMatricula } from '../services/AlunoService';

export function useGetAlunoByMatricula(matricula) {
    return useQuery({
        queryKey: ['alunos', matricula],
        queryFn: () => getAlunoByMatricula(matricula),
        staleTime: 5 * 60 * 1000, // 5 minutos
    })
}
