import { getPeiById } from "./PeiServiceMock.js";

const peisExemplo = [
  getPeiById("550e8400-e29b-41d4-a716-446655440000"),
  getPeiById("550e8400-e29b-41d4-a716-446655440003"),
];

// Fixtures de PEA vinculados aos IDs reais dos registros em PeiServiceMock.
const peasIniciais = [
  {
    id: "550e8400-e29b-41d4-a716-446655440100",
    peiIndex: 0,
    componenteCurricular: "Matemática",
    semestreAno: "2026.1",
    docente: "Professor Exemplo",
    objetivoGeral: "Desenvolver as habilidades matemáticas do estudante.",
    objetivosEspecificos:
      "Trabalhar operações básicas e resolução de problemas.",
    conteudosProgramaticos: "Operações fundamentais, frações e equações.",
    metodologia: "Atividades adaptadas e acompanhamento individual.",
    avaliacao: "Avaliação contínua e atividades práticas.",
    bibliografiaBasica: "Matemática Básica.",
    bibliografiaComplementar: "Fundamentos da Matemática.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440101",
    peiIndex: 1,
    componenteCurricular: "Português",
    semestreAno: "2026.1",
    docente: "Outra Professora",
    objetivoGeral: "Desenvolver a interpretação e produção textual.",
    objetivosEspecificos: "Estimular leitura e compreensão de textos.",
    conteudosProgramaticos: "Interpretação textual e produção escrita.",
    metodologia: "Leitura orientada e atividades adaptadas.",
    avaliacao: "Atividades individuais e participação.",
    bibliografiaBasica: "Língua Portuguesa.",
    bibliografiaComplementar: "Práticas de Leitura.",
  },
];

let peas = peasIniciais.map(({ peiIndex, ...pea }) => {
  const pei = peisExemplo[peiIndex];

  return {
    ...pea,
    alunoId: pei.alunoId,
    alunoMatricula: pei.alunoMatricula,
    peiId: pei.id,
  };
});

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validarVinculos(data) {
  if (!data || typeof data !== "object") {
    throw new TypeError("Os dados do PEA devem ser um objeto.");
  }

  if (!UUID_PATTERN.test(String(data.alunoId ?? ""))) {
    throw new TypeError("O ID do aluno deve ser um UUID válido.");
  }

  if (!UUID_PATTERN.test(String(data.peiId ?? ""))) {
    throw new TypeError("O ID do PEI deve ser um UUID válido.");
  }

  const pei = getPeiById(String(data.peiId));
  if (pei && String(pei.alunoId) !== String(data.alunoId)) {
    throw new Error("O PEI informado não pertence ao aluno associado.");
  }
  if (
    pei &&
    data.alunoMatricula &&
    String(pei.alunoMatricula) !== String(data.alunoMatricula)
  ) {
    throw new Error("A matrícula informada não corresponde ao PEI associado.");
  }

  return pei;
}

export function getPeas({ page = 0, size = 20, filters = {} } = {}) {
  let resultado = peas;

  if (filters.alunoId) {
    resultado = resultado.filter(
      (pea) => pea.alunoId === String(filters.alunoId),
    );
  }

  if (filters.alunoMatricula) {
    resultado = resultado.filter(
      (pea) => pea.alunoMatricula === String(filters.alunoMatricula),
    );
  }

  if (filters.peiId) {
    resultado = resultado.filter(
      (pea) => pea.peiId === String(filters.peiId),
    );
  }

  const inicio = page * size;
  const content = resultado.slice(inicio, inicio + size);

  return {
    content,
    totalElements: resultado.length,
    totalPages: size > 0 ? Math.ceil(resultado.length / size) : 0,
    number: page,
    size,
  };
}

export function getPeaById(id) {
  return peas.find((pea) => String(pea.id) === String(id)) || null;
}

export function postPea(data) {
  const pei = validarVinculos(data);
  // Novos registros permanecem disponíveis durante a execução da aplicação.
  const novoPea = {
    ...data,
    id: globalThis.crypto.randomUUID(),
    alunoId: String(data.alunoId),
    alunoMatricula: data.alunoMatricula ?? pei?.alunoMatricula,
    peiId: String(data.peiId),
  };

  peas.push(novoPea);

  return novoPea;
}

export function deletePea(id) {
  const quantidadeAnterior = peas.length;
  peas = peas.filter((pea) => String(pea.id) !== String(id));
  return peas.length < quantidadeAnterior;
}
