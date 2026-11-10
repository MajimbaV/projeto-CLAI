import { useQuery } from '@tanstack/react-query';
import { getPlanosAcao } from '../services/PlanoAcaoService';

export function useGetPlanosAcaoByMatricula(matriculaAluno, options = {}) {
  return useQuery({
    queryKey: ['planos-acao', 'matricula', matriculaAluno],
    queryFn: () => getPlanosAcao({ matriculaAluno }),
    enabled: Boolean(matriculaAluno),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

