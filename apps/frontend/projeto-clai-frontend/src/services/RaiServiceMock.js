import { getPeaById, getPeas } from "./PeaServiceMock.js";
import { getPeiById } from "./PeiServiceMock.js";

const raisMock = [
  {
    id: "880e8400-e29b-41d4-a716-446655440000",
    alunoId: "550e8400-e29b-41d4-a716-446655440001",
    peiId: "550e8400-e29b-41d4-a716-446655440000",
    peaId: "550e8400-e29b-41d4-a716-446655440100",
    alunoNome: "Ana Carolina Souza",
    alunoMatricula: "2024001",
    curso: "Técnico em Informática",

    periodoLetivo: "2026.1",
    componenteCurricular: "Matemática",
    docente: "Professor Exemplo",

    relacionamento: ["Afetivo", "Socializado"],
    relacionamentoOutro: "",
    comentarioRelacionamento:
      "Interage de forma positiva com os colegas e participa das atividades em grupo.",

    habilidadesCognitivas: ["Foco", "Memória", "Criatividade"],
    habilidadesCognitivasOutro: "",
    comentarioHabilidadesCognitivas:
      "Apresenta melhora na manutenção da atenção durante atividades orientadas.",

    habilidadesSocioemocionais: ["Empatia", "Confiança", "Autonomia"],
    habilidadesSocioemocionaisOutro: "",
    comentarioHabilidadesSocioemocionais:
      "Demonstra maior iniciativa para solicitar ajuda e compartilhar suas ideias.",

    avancosGerais:
      "A estudante ampliou sua participação nas atividades, demonstrou maior autonomia na organização das tarefas e apresentou avanços na interação com a turma.",
    dificuldadesAprendizagem:
      "Ainda necessita de apoio para interpretar enunciados extensos e organizar textos com várias etapas.",
    fatoresExternos:
      "Não foram identificados fatores externos relevantes durante o período.",

    habilidadesCompetencias: [
      {
        habilidadeDesenvolvida:
          "Identificar informações explícitas em textos de diferentes gêneros.",
        nivelAprendizado: "Bom",
        observacoes:
          "Realiza a atividade com mais autonomia quando utiliza roteiro de leitura.",
      },
      {
        habilidadeDesenvolvida:
          "Organizar ideias para produzir pequenos textos.",
        nivelAprendizado: "Satisfatório",
        observacoes:
          "Evoluiu na sequência das ideias, mas ainda precisa de orientação na revisão textual.",
      },
      {
        habilidadeDesenvolvida:
          "Participar de atividades de leitura compartilhada.",
        nivelAprendizado: "Ótimo",
        observacoes:
          "Participa espontaneamente e contribui com comentários pertinentes.",
      },
    ],

    parecer:
      "A estudante apresentou avanços na participação, na leitura compartilhada e na realização das atividades propostas. As estratégias de divisão das tarefas em etapas e o uso de roteiros de leitura mostraram resultados positivos. Para a próxima etapa, recomenda-se manter esses recursos e ampliar gradualmente as atividades de interpretação e produção textual, incentivando a autonomia na revisão dos textos.",
    data: "2026-06-30",
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440001",
    alunoId: "550e8400-e29b-41d4-a716-446655440004",
    peiId: "550e8400-e29b-41d4-a716-446655440003",
    peaId: "550e8400-e29b-41d4-a716-446655440101",
    alunoNome: "Bruno Henrique Lima",
    alunoMatricula: "2024002",
    curso: "Técnico em Edificações",

    periodoLetivo: "2026.1",
    componenteCurricular: "Português",
    docente: "Outra Professora",

    relacionamento: ["Afetivo", "Socializado"],
    relacionamentoOutro: "",
    comentarioRelacionamento:
      "Mantém boa relação com os colegas e responde bem às atividades colaborativas.",

    habilidadesCognitivas: ["Memória", "Compreensão geral", "Outros"],
    habilidadesCognitivasOutro:
      "Raciocínio lógico com apoio de material concreto",
    comentarioHabilidadesCognitivas:
      "Apresenta melhor desempenho quando as instruções são curtas e acompanhadas de exemplos.",

    habilidadesSocioemocionais: ["Compromisso", "Paciência", "Autonomia"],
    habilidadesSocioemocionaisOutro: "",
    comentarioHabilidadesSocioemocionais:
      "Tem demonstrado persistência diante de atividades que exigem mais de uma tentativa.",

    avancosGerais:
      "O estudante passou a iniciar as atividades com menos intervenções e demonstrou maior segurança ao utilizar materiais concretos para resolver situações-problema.",
    dificuldadesAprendizagem:
      "Apresenta dificuldade para resolver problemas escritos com várias informações e para generalizar estratégias sem apoio visual.",
    fatoresExternos:
      "Não foram registrados fatores externos que tenham interferido diretamente no acompanhamento neste período.",

    habilidadesCompetencias: [
      {
        habilidadeDesenvolvida:
          "Resolver operações fundamentais com apoio de material concreto.",
        nivelAprendizado: "Bom",
        observacoes:
          "Resolve adições e subtrações com maior segurança; multiplicação ainda requer mediação.",
      },
      {
        habilidadeDesenvolvida:
          "Identificar dados relevantes em situações-problema.",
        nivelAprendizado: "Satisfatório",
        observacoes:
          "Necessita de destaque visual das informações principais do enunciado.",
      },
    ],

    parecer:
      "O estudante apresentou evolução na realização de operações com suporte concreto e na organização da rotina de atividades. O uso de exemplos resolvidos e de recursos visuais favoreceu a compreensão. Recomenda-se manter essas estratégias, ampliar gradualmente a complexidade dos problemas e estimular a identificação autônoma das informações relevantes.",
    data: "2026-06-30",
  },
];

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function gerarId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `rai-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizarArray(valor) {
  return Array.isArray(valor) ? [...valor] : [];
}

// A quantidade de habilidades agora é variável; nenhuma posição vazia é criada automaticamente.
function normalizarHabilidades(habilidades) {
  if (!Array.isArray(habilidades)) return [];

  return habilidades.map((habilidade) => ({
    habilidadeDesenvolvida: habilidade?.habilidadeDesenvolvida ?? "",
    nivelAprendizado: habilidade?.nivelAprendizado ?? "",
    observacoes: habilidade?.observacoes ?? "",
  }));
}

function removerAssinaturaDocente(dados) {
  const dadosSemAssinatura = { ...(dados ?? {}) };
  delete dadosSemAssinatura.assinaturaDocente;
  return dadosSemAssinatura;
}

function validarVinculos(data) {
  if (!data || typeof data !== "object") {
    throw new TypeError("Os dados do RAI devem ser um objeto.");
  }

  const peaId = String(data.peaId ?? "");

  if (!UUID_PATTERN.test(peaId)) {
    throw new TypeError("O RAI deve estar associado a um PEA válido.");
  }

  const pea = getPeaById(peaId);

  if (!pea) {
    throw new Error("O PEA associado ao RAI não foi encontrado.");
  }

  const alunoId = String(data.alunoId || pea.alunoId || "");
  const peiId = String(data.peiId || pea.peiId || "");

  if (!UUID_PATTERN.test(alunoId)) {
    throw new TypeError("O ID do aluno deve ser um UUID válido.");
  }

  if (!UUID_PATTERN.test(peiId)) {
    throw new TypeError("O ID do PEI deve ser um UUID válido.");
  }

  if (String(pea.alunoId) !== alunoId) {
    throw new Error("O PEA informado não pertence ao aluno associado.");
  }

  if (String(pea.peiId) !== peiId) {
    throw new Error("O PEA informado não pertence ao PEI associado.");
  }

  const pei = getPeiById(peiId);

  if (pei && String(pei.alunoId) !== alunoId) {
    throw new Error("O PEI informado não pertence ao aluno associado.");
  }

  if (
    pei &&
    data.alunoMatricula &&
    String(pei.alunoMatricula) !== String(data.alunoMatricula)
  ) {
    throw new Error("A matrícula informada não corresponde ao PEI associado.");
  }

  return { pea, pei, alunoId, peiId, peaId };
}

function aplicarContextoPea(rai, vinculos) {
  const { pea, pei, alunoId, peiId, peaId } = vinculos;

  return {
    ...rai,
    alunoId,
    peiId,
    peaId,
    alunoNome: rai.alunoNome || pei?.alunoNome || "",
    alunoMatricula:
      rai.alunoMatricula || pea.alunoMatricula || pei?.alunoMatricula || "",
    periodoLetivo: pea.semestreAno ?? "",
    componenteCurricular: pea.componenteCurricular ?? "",
    docente: pea.docente ?? "",
    habilidadesCompetencias: normalizarHabilidades(rai.habilidadesCompetencias),
  };
}

function clonarRai(rai) {
  if (!rai) return null;

  const pea = rai.peaId ? getPeaById(rai.peaId) : null;

  return {
    ...rai,
    relacionamento: normalizarArray(rai.relacionamento),
    habilidadesCognitivas: normalizarArray(rai.habilidadesCognitivas),
    habilidadesSocioemocionais: normalizarArray(rai.habilidadesSocioemocionais),
    habilidadesCompetencias: normalizarHabilidades(rai.habilidadesCompetencias),
    pea: pea ? { ...pea } : null,
  };
}

export function postRai(data) {
  const dadosSemAssinatura = removerAssinaturaDocente(data);

  const novoRai = {
    alunoId: "",
    peiId: "",
    peaId: "",
    alunoNome: "",
    alunoMatricula: "",
    curso: "",
    periodoLetivo: "",
    componenteCurricular: "",
    docente: "",
    relacionamento: [],
    relacionamentoOutro: "",
    comentarioRelacionamento: "",
    habilidadesCognitivas: [],
    habilidadesCognitivasOutro: "",
    comentarioHabilidadesCognitivas: "",
    habilidadesSocioemocionais: [],
    habilidadesSocioemocionaisOutro: "",
    comentarioHabilidadesSocioemocionais: "",
    avancosGerais: "",
    dificuldadesAprendizagem: "",
    fatoresExternos: "",
    habilidadesCompetencias: [],
    parecer: "",
    data: "",
    ...dadosSemAssinatura,
    id: gerarId(),
  };

  const vinculos = validarVinculos(novoRai);
  const raiComContexto = aplicarContextoPea(novoRai, vinculos);

  raiComContexto.relacionamento = normalizarArray(
    raiComContexto.relacionamento,
  );
  raiComContexto.habilidadesCognitivas = normalizarArray(
    raiComContexto.habilidadesCognitivas,
  );
  raiComContexto.habilidadesSocioemocionais = normalizarArray(
    raiComContexto.habilidadesSocioemocionais,
  );

  raisMock.push(raiComContexto);

  return clonarRai(raiComContexto);
}

export function getRais({ page = 0, size = 20, filters = {} } = {}) {
  const raisFiltrados = raisMock.filter((rai) =>
    Object.entries(filters).every(([campo, valor]) => {
      if (valor === "" || valor === null || valor === undefined) {
        return true;
      }

      return String(rai[campo] ?? "") === String(valor);
    }),
  );

  const pagina = Math.max(0, Number(page) || 0);
  const tamanho = Math.max(0, Number(size) || 0);
  const inicio = pagina * tamanho;
  const content = raisFiltrados.slice(inicio, inicio + tamanho).map(clonarRai);

  return {
    content,
    totalElements: raisFiltrados.length,
    totalPages: tamanho > 0 ? Math.ceil(raisFiltrados.length / tamanho) : 0,
    size: tamanho,
    number: pagina,
    numberOfElements: content.length,
    first: pagina === 0,
    last: inicio + tamanho >= raisFiltrados.length,
    empty: content.length === 0,
  };
}

export function getRaiById(id) {
  const rai = raisMock.find((item) => String(item.id) === String(id));
  return clonarRai(rai);
}

export function getRaiByPeaId(peaId) {
  const rai = raisMock.find((item) => String(item.peaId) === String(peaId));
  return clonarRai(rai);
}

// Lista estudantes que possuem PEA disponível para associação ao RAI.
export function getRaiMockStudents() {
  const { content: peasDisponiveis = [] } = getPeas({ page: 0, size: 100 });

  return peasDisponiveis
    .map((pea) => {
      const pei = getPeiById(pea.peiId);
      if (!pei) return null;

      const raiExistente = raisMock.find(
        (rai) => String(rai.peaId) === String(pea.id),
      );

      return {
        id: pea.alunoId,
        peiId: pea.peiId,
        peaId: pea.id,
        alunoNome: raiExistente?.alunoNome ?? pei.alunoNome ?? "",
        alunoMatricula: pea.alunoMatricula ?? pei.alunoMatricula ?? "",
        alunoCurso: raiExistente?.curso ?? pei.curso ?? pei.alunoCurso ?? "",
      };
    })
    .filter(Boolean);
}

// Contexto para abrir cadastro/edição: retorna o estudante e o PEA associado.
export function getRaiTestContext(id) {
  const rai = raisMock.find((item) => String(item.id) === String(id));

  const aluno = rai
    ? {
        id: rai.alunoId,
        peiId: rai.peiId,
        peaId: rai.peaId,
        alunoNome: rai.alunoNome,
        alunoMatricula: rai.alunoMatricula,
        alunoCurso: rai.curso,
      }
    : getRaiMockStudents().find(
        (estudante) =>
          String(estudante.id) === String(id) ||
          String(estudante.alunoMatricula) === String(id),
      );

  if (!aluno?.peaId) return null;

  const pea = getPeaById(aluno.peaId);
  if (!pea) return null;

  return {
    aluno: {
      id: aluno.id,
      alunoNome: aluno.alunoNome,
      alunoMatricula: aluno.alunoMatricula,
      alunoCurso: aluno.alunoCurso,
    },
    pea: { ...pea },
    peaId: pea.id,
    peiId: pea.peiId,
    matriculaAluno: aluno.alunoMatricula,
  };
}

export function putRai(id, data) {
  const index = raisMock.findIndex((rai) => String(rai.id) === String(id));

  if (index === -1) return null;

  const dadosSemAssinatura = removerAssinaturaDocente(data);
  const raiAtualizado = {
    ...raisMock[index],
    ...dadosSemAssinatura,
    id: raisMock[index].id,
  };

  const vinculos = validarVinculos(raiAtualizado);
  const raiComContexto = aplicarContextoPea(raiAtualizado, vinculos);

  raiComContexto.relacionamento = normalizarArray(
    raiComContexto.relacionamento,
  );
  raiComContexto.habilidadesCognitivas = normalizarArray(
    raiComContexto.habilidadesCognitivas,
  );
  raiComContexto.habilidadesSocioemocionais = normalizarArray(
    raiComContexto.habilidadesSocioemocionais,
  );

  raisMock[index] = raiComContexto;

  return clonarRai(raiComContexto);
}

export function deleteRai(id) {
  const index = raisMock.findIndex((rai) => String(rai.id) === String(id));

  if (index === -1) return false;

  raisMock.splice(index, 1);

  return true;
}
