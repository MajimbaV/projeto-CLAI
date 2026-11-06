import { useQuery } from "@tanstack/react-query";
import { getAlunos } from "../services/AlunoService";

const TAMANHO_PAGINA = 100;

async function buscarTodosAlunos() {
  const primeiraPagina = await getAlunos(0, TAMANHO_PAGINA);

  const totalPaginas = primeiraPagina.totalPages ?? 1;

  const paginasRestantes = await Promise.all(
    Array.from({ length: Math.max(totalPaginas - 1, 0) }, (_, index) =>
      getAlunos(index + 1, TAMANHO_PAGINA),
    ),
  );

  return [primeiraPagina, ...paginasRestantes].flatMap(
    (pagina) => pagina.content ?? [],
  );
}

export function useGetTodosAlunos() {
  return useQuery({
    queryKey: ["alunos", "todos"],
    queryFn: buscarTodosAlunos,
    staleTime: 5 * 60 * 1000,
  });
}