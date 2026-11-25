import { useQuery } from '@tanstack/react-query';
import { getEstudosCaso } from '../../services/EstudoCasoService';

export function useGetEstudosCasoByMatricula(matriculaAluno, {page = 1, size = 10, sort="id,asc", filters} = {}) {

    if(page < 1){
        page = 1
    }

  return useQuery({
    queryKey: ['estudos-caso', 'matricula', matriculaAluno, page, size, sort, filters],
    enabled: Boolean(matriculaAluno),
    queryFn: () => getEstudosCaso({
        page: page - 1,
        size: size,
        sort: sort,
        filters: {
            ...filters,
            matriculaAluno: matriculaAluno
        }
    })
  });
}

