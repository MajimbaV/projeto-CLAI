import { useQuery } from "@tanstack/react-query";
import { getCursos } from "../../services/CursoService";

export function useGetCursos({ page = 1, size = 10, sort = "nomeCurso,asc", filters } = {}) {
  if (page < 1) {
    page = 1;
  }
  if (size < 1) {
    size = 10;
  }

  return useQuery({
    queryKey: ["cursos", { page, size, sort, filters }],
    queryFn: () => getCursos({ page: page - 1, size, sort, filters }),
    staleTime: 5 * 60 * 1000, // 5 minutos
    placeholderData: (prev) => prev,
  });
}