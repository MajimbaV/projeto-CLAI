// Serviço mockado de Cursos.
// Mantém os mesmos nomes de operações do CursoService.js para facilitar
// a futura substituição pelo serviço integrado à API.

const cursosMock = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    nomeCurso: "Análise e Desenvolvimento de Sistemas",
    cursoSigla: "ADS",
    nivelEnsino: "GRADUACAO",
    cursoModalidade: "PRESENCIAL",
    cursoTurno: "NOTURNO",
    statusAtivo: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    nomeCurso: "Matemática",
    cursoSigla: "MAT",
    nivelEnsino: "GRADUACAO",
    cursoModalidade: "PRESENCIAL",
    cursoTurno: "MATUTINO",
    statusAtivo: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    nomeCurso: "Técnico em Informática",
    cursoSigla: "TI",
    nivelEnsino: "TECNICO_INTEGRADO",
    cursoModalidade: "PRESENCIAL",
    cursoTurno: "INTEGRAL",
    statusAtivo: true,
  },
];

const NIVEIS_ENSINO = [
  "TECNICO_INTEGRADO",
  "TECNICO_SUBSEQUENTE",
  "GRADUACAO",
  "POS_GRADUACAO",
];

const MODALIDADES = ["PRESENCIAL", "EAD"];
const TURNOS = ["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"];

function clonarCurso(curso) {
  return curso ? { ...curso } : null;
}

function gerarId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `curso-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizarTexto(valor) {
  return String(valor ?? "").trim();
}

function normalizarBooleano(valor) {
  if (valor === true || valor === "true") return true;
  if (valor === false || valor === "false") return false;
  return valor;
}

function validarCurso(data, idIgnorado = null) {
  const erros = {};
  const nomeCurso = normalizarTexto(data.nomeCurso);
  const cursoSigla = normalizarTexto(data.cursoSigla);

  if (!nomeCurso) {
    erros.nomeCurso = "O nome do curso é obrigatório.";
  } else if (/\d/.test(nomeCurso)) {
    erros.nomeCurso = "O nome do curso não pode conter números.";
  }

  if (!cursoSigla) {
    erros.cursoSigla = "A sigla do curso é obrigatória.";
  } else if (!/^[A-Z-]{2,}$/.test(cursoSigla)) {
    erros.cursoSigla =
      "A sigla deve conter ao menos 2 caracteres, utilizando somente letras maiúsculas e hífens.";
  }

  if (!NIVEIS_ENSINO.includes(data.nivelEnsino)) {
    erros.nivelEnsino = "Selecione um nível de ensino válido.";
  }

  if (!MODALIDADES.includes(data.cursoModalidade)) {
    erros.cursoModalidade = "Selecione uma modalidade válida.";
  }

  if (!TURNOS.includes(data.cursoTurno)) {
    erros.cursoTurno = "Selecione um turno válido.";
  }

  const siglaEmUso = cursosMock.some(
    (curso) =>
      curso.id !== idIgnorado &&
      curso.cursoSigla.toUpperCase() === cursoSigla.toUpperCase(),
  );

  if (cursoSigla && siglaEmUso) {
    erros.cursoSigla = "Já existe um curso cadastrado com essa sigla.";
  }

  if (Object.keys(erros).length > 0) {
    const erro = new Error(
      "Não foi possível salvar o curso. Verifique os dados informados.",
    );
    erro.validationErrors = erros;
    throw erro;
  }
}

function obterValorOrdenacao(curso, propriedade) {
  // Compatibilidade com o nome usado como sort padrão no serviço antigo.
  const propriedadeNormalizada =
    propriedade === "cursoNome" ? "nomeCurso" : propriedade;

  return curso[propriedadeNormalizada];
}

function compararValores(valorA, valorB) {
  if (typeof valorA === "boolean" && typeof valorB === "boolean") {
    return Number(valorA) - Number(valorB);
  }

  return String(valorA ?? "").localeCompare(String(valorB ?? ""), "pt-BR", {
    numeric: true,
    sensitivity: "base",
  });
}

/**
 * Cadastra um curso e devolve o registro criado.
 * O registro é mantido em memória até a aplicação ser recarregada.
 */
export async function postCurso(data) {
  const novoCurso = {
    nomeCurso: normalizarTexto(data?.nomeCurso),
    cursoSigla: normalizarTexto(data?.cursoSigla),
    nivelEnsino: data?.nivelEnsino,
    cursoModalidade: data?.cursoModalidade,
    cursoTurno: data?.cursoTurno,
    statusAtivo: data?.statusAtivo ?? true,
  };

  validarCurso(novoCurso);

  const cursoCriado = {
    id: gerarId(),
    ...novoCurso,
  };

  cursosMock.push(cursoCriado);

  return clonarCurso(cursoCriado);
}

/**
 * Lista cursos usando parâmetros semelhantes aos do Spring Pageable.
 * Por padrão, retorna somente cursos ativos.
 * Para consultar inativos, informe filters: { statusAtivo: false }.
 */
export async function getCursos({
  page = 0,
  size = 10,
  sort = "nomeCurso,asc",
  filters = {},
} = {}) {
  const filtros = { ...filters };

  Object.keys(filtros).forEach((chave) => {
    if (
      filtros[chave] === "" ||
      filtros[chave] === null ||
      filtros[chave] === undefined
    ) {
      delete filtros[chave];
    }
  });

  let resultado = [...cursosMock];

  const statusAtivo = Object.prototype.hasOwnProperty.call(
    filtros,
    "statusAtivo",
  )
    ? normalizarBooleano(filtros.statusAtivo)
    : true;

  resultado = resultado.filter((curso) => curso.statusAtivo === statusAtivo);

  delete filtros.statusAtivo;

  const nomeCurso = normalizarTexto(filtros.nomeCurso).toLocaleLowerCase(
    "pt-BR",
  );

  if (nomeCurso) {
    resultado = resultado.filter((curso) =>
      curso.nomeCurso.toLocaleLowerCase("pt-BR").includes(nomeCurso),
    );
  }

  const modalidade = filtros.modalidade ?? filtros.cursoModalidade;

  if (modalidade) {
    resultado = resultado.filter(
      (curso) => curso.cursoModalidade === modalidade,
    );
  }

  if (filtros.nivelEnsino) {
    resultado = resultado.filter(
      (curso) => curso.nivelEnsino === filtros.nivelEnsino,
    );
  }

  const turno = filtros.turno ?? filtros.cursoTurno;

  if (turno) {
    resultado = resultado.filter((curso) => curso.cursoTurno === turno);
  }

  // A ordenação segue o formato aceito pelo Spring: propriedade,direção.
  const [propriedade = "nomeCurso", direcao = "asc"] = String(sort).split(",");

  const multiplicador = direcao.toLowerCase() === "desc" ? -1 : 1;

  resultado.sort(
    (cursoA, cursoB) =>
      compararValores(
        obterValorOrdenacao(cursoA, propriedade),
        obterValorOrdenacao(cursoB, propriedade),
      ) * multiplicador,
  );

  const pagina = Math.max(0, Number(page) || 0);
  const tamanho = Math.max(1, Number(size) || 10);

  const totalElements = resultado.length;
  const totalPages = Math.ceil(totalElements / tamanho);

  const inicio = pagina * tamanho;

  const content = resultado.slice(inicio, inicio + tamanho).map(clonarCurso);

  return {
    content,
    totalElements,
    totalPages,
    size: tamanho,
    number: pagina,
    numberOfElements: content.length,
    first: pagina === 0,
    last: totalPages === 0 || pagina >= totalPages - 1,
    empty: content.length === 0,
  };
}

/** Busca um curso pelo identificador. */
export async function getCursoById(id) {
  const curso = cursosMock.find((item) => item.id === id);

  return clonarCurso(curso);
}

/** Busca um curso pela sigla. */
export async function getCursoBySigla(sigla) {
  const siglaNormalizada = normalizarTexto(sigla).toUpperCase();

  const curso = cursosMock.find(
    (item) => item.cursoSigla.toUpperCase() === siglaNormalizada,
  );

  return clonarCurso(curso);
}

/** Atualiza os dados de um curso existente. */
export async function putCurso(id, data) {
  const indice = cursosMock.findIndex((curso) => curso.id === id);

  if (indice === -1) {
    throw new Error("Curso não encontrado.");
  }

  const cursoAtualizado = {
    ...cursosMock[indice],
    ...data,
    id,
    nomeCurso: normalizarTexto(data?.nomeCurso ?? cursosMock[indice].nomeCurso),
    cursoSigla: normalizarTexto(
      data?.cursoSigla ?? cursosMock[indice].cursoSigla,
    ),
  };

  validarCurso(cursoAtualizado, id);

  cursosMock[indice] = cursoAtualizado;

  return clonarCurso(cursoAtualizado);
}

/** Desativa/arquiva um curso. Não realiza exclusão física. */
export async function deleteCurso(id) {
  const curso = cursosMock.find((item) => item.id === id);

  if (!curso) {
    throw new Error("Curso não encontrado.");
  }

  curso.statusAtivo = false;
}

/** Reativa um curso previamente desativado. */
export async function ativarCurso(id) {
  const curso = cursosMock.find((item) => item.id === id);

  if (!curso) {
    throw new Error("Curso não encontrado.");
  }

  curso.statusAtivo = true;
}
