import { getPeis } from "./PeiServiceMock.js";

// Deriva alunos dos PEIs mockados para manter IDs e matrículas consistentes.
const CURSO_MOCK = {
  id: "curso-mock-1",
  nomeCurso: "Curso de demonstração",
  cursoSigla: "DEMO",
};

function listarAlunos() {
  const peis = getPeis({ page: 0, size: 100 }).content;
  const alunosPorId = new Map();

  for (const [index, pei] of peis.entries()) {
    if (!alunosPorId.has(pei.alunoId)) {
      alunosPorId.set(pei.alunoId, {
        id: pei.alunoId,
        alunoNome: pei.alunoNome,
        alunoMatricula: pei.alunoMatricula,
        alunoCurso: CURSO_MOCK.nomeCurso,
        cursoId: CURSO_MOCK.id,
        curso: CURSO_MOCK,
        periodoIngresso: "2024.1",
        periodoAluno: pei.periodoPei ?? "2026.1",
        statusAtivo: pei.ativo ?? true,
        maioridade: index % 2 === 0,
      });
    }
  }

  return Array.from(alunosPorId.values());
}

export function getAlunos({
  page = 0,
  size = 10,
  sort = "alunoNome,asc",
  filters = {},
} = {}) {
  let resultado = listarAlunos();

  if (filters.nome) {
    const nome = String(filters.nome).toLocaleLowerCase();
    resultado = resultado.filter((aluno) =>
      aluno.alunoNome.toLocaleLowerCase().includes(nome),
    );
  }

  if (filters.matricula) {
    resultado = resultado.filter(
      (aluno) => aluno.alunoMatricula === String(filters.matricula),
    );
  }

  if (filters.cursoId) {
    resultado = resultado.filter(
      (aluno) => aluno.cursoId === String(filters.cursoId),
    );
  }

  if (filters.periodo) {
    resultado = resultado.filter(
      (aluno) => aluno.periodoAluno === String(filters.periodo),
    );
  }

  if (filters.maioridade !== undefined && filters.maioridade !== "") {
    const maioridade = filters.maioridade === true || filters.maioridade === "true";
    resultado = resultado.filter(
      (aluno) => aluno.maioridade === maioridade,
    );
  }

  if (filters.statusAtivo !== undefined && filters.statusAtivo !== "") {
    resultado = resultado.filter(
      (aluno) => aluno.statusAtivo === filters.statusAtivo,
    );
  }

  const [campoOrdenacao, direcao] = sort.split(",");
  const multiplicador = direcao === "desc" ? -1 : 1;
  resultado.sort(
    (a, b) =>
      String(a[campoOrdenacao] ?? "").localeCompare(
        String(b[campoOrdenacao] ?? ""),
        "pt-BR",
        { numeric: true },
      ) * multiplicador,
  );

  const inicio = page * size;
  const content = resultado.slice(inicio, inicio + size);

  return {
    content,
    totalElements: resultado.length,
    totalPages: size > 0 ? Math.ceil(resultado.length / size) : 0,
    number: page,
    size,
    numberOfElements: content.length,
    first: page === 0,
    last: inicio + size >= resultado.length,
    empty: content.length === 0,
  };
}

export function getAlunoByMatricula(matricula) {
  return (
    listarAlunos().find(
      (aluno) => aluno.alunoMatricula === String(matricula),
    ) ?? null
  );
}

export function getCursos({ page = 0, size = 100 } = {}) {
  const content = [CURSO_MOCK].slice(page * size, page * size + size);

  return {
    content,
    totalElements: 1,
    totalPages: size > 0 ? Math.ceil(1 / size) : 0,
    number: page,
    size,
    numberOfElements: content.length,
    first: page === 0,
    last: page * size + size >= 1,
    empty: content.length === 0,
  };
}
