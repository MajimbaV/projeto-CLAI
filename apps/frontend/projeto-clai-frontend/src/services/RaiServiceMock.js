const raisMock = [
  {
    id: "880e8400-e29b-41d4-a716-446655440000",
    alunoId: "550e8400-e29b-41d4-a716-446655440001",
    peiId: "550e8400-e29b-41d4-a716-446655440000",
    alunoNome: "Ana Carolina Souza",
    alunoMatricula: "2024001",
    curso: "Técnico em Informática",

    periodoLetivo: "2026.1",
    componenteCurricular: "Língua Portuguesa",
    docente: "Professor(a) responsável",

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
    assinaturaDocente: "Professor(a) responsável",
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440001",
    alunoId: "550e8400-e29b-41d4-a716-446655440004",
    peiId: "550e8400-e29b-41d4-a716-446655440003",
    alunoNome: "Bruno Henrique Lima",
    alunoMatricula: "2024002",
    curso: "Técnico em Edificações",

    periodoLetivo: "2026.1",
    componenteCurricular: "Matemática",
    docente: "Professor(a) responsável",

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
    assinaturaDocente: "Professor(a) responsável",
  },
];

// Alunos adicionais para teste; os IDs correspondem aos PEIs existentes no PeiServiceMock.
const alunosMockados = [
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    peiId: "550e8400-e29b-41d4-a716-446655440005",
    alunoNome: "Beatriz Oliveira Santos",
    alunoMatricula: "2024003",
    alunoCurso: "",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    peiId: "550e8400-e29b-41d4-a716-446655440007",
    alunoNome: "Carlos Eduardo Mendes",
    alunoMatricula: "2024004",
    alunoCurso: "",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    peiId: "550e8400-e29b-41d4-a716-446655440009",
    alunoNome: "Daniela Ferreira Costa",
    alunoMatricula: "2024005",
    alunoCurso: "",
  },
];

function gerarId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `rai-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function criarHabilidadesVazias() {
  return Array.from({ length: 7 }, () => ({
    habilidadeDesenvolvida: "",
    nivelAprendizado: "",
    observacoes: "",
  }));
}

function normalizarHabilidades(habilidades) {
  const recebidas = Array.isArray(habilidades) ? habilidades : [];

  return Array.from({ length: 7 }, (_, index) => ({
    habilidadeDesenvolvida: recebidas[index]?.habilidadeDesenvolvida ?? "",
    nivelAprendizado: recebidas[index]?.nivelAprendizado ?? "",
    observacoes: recebidas[index]?.observacoes ?? "",
  }));
}

export function postRai(data) {
  const novoRai = {
    alunoId: "",
    peiId: "",
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
    habilidadesCompetencias: criarHabilidadesVazias(),
    parecer: "",
    data: "",
    assinaturaDocente: "",
    ...data,
    id: gerarId(),
  };

  novoRai.relacionamento = Array.isArray(novoRai.relacionamento)
    ? [...novoRai.relacionamento]
    : [];

  novoRai.habilidadesCognitivas = Array.isArray(novoRai.habilidadesCognitivas)
    ? [...novoRai.habilidadesCognitivas]
    : [];

  novoRai.habilidadesSocioemocionais = Array.isArray(
    novoRai.habilidadesSocioemocionais,
  )
    ? [...novoRai.habilidadesSocioemocionais]
    : [];

  novoRai.habilidadesCompetencias = normalizarHabilidades(
    novoRai.habilidadesCompetencias,
  );

  raisMock.push(novoRai);

  return novoRai;
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
  const content = raisFiltrados.slice(inicio, inicio + tamanho);

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
  return raisMock.find((rai) => String(rai.id) === String(id)) || null;
}

// Lista usada pelo planejamento no teste local; remover junto ao fallback da página na integração real.
export function getRaiMockStudents() {
  const alunos = new Map();

  raisMock.forEach((rai) => {
    if (!rai.alunoId) return;

    alunos.set(String(rai.alunoId), {
      id: rai.alunoId,
      peiId: rai.peiId,
      alunoNome: rai.alunoNome,
      alunoMatricula: rai.alunoMatricula,
      alunoCurso: rai.curso,
    });
  });

  alunosMockados.forEach((aluno) => {
    if (!alunos.has(String(aluno.id))) {
      alunos.set(String(aluno.id), aluno);
    }
  });

  return Array.from(alunos.values(), (aluno) => ({ ...aluno }));
}

// Contexto para abrir cadastro/edição isolados; remover quando a navegação receber dados reais do planejamento.
export function getRaiTestContext(id) {
  const rai = getRaiById(id);
  const aluno = rai
    ? {
        id: rai.alunoId,
        peiId: rai.peiId,
        alunoNome: rai.alunoNome,
        alunoMatricula: rai.alunoMatricula,
        alunoCurso: rai.curso,
      }
    : getRaiMockStudents().find(
        (estudante) => String(estudante.id) === String(id),
      );

  if (!aluno) return null;

  return {
    aluno: {
      id: aluno.id,
      alunoNome: aluno.alunoNome,
      alunoMatricula: aluno.alunoMatricula,
      alunoCurso: aluno.alunoCurso,
    },
    peiId: aluno.peiId,
    matriculaAluno: aluno.alunoMatricula,
  };
}

export function putRai(id, data) {
  const index = raisMock.findIndex((rai) => String(rai.id) === String(id));

  if (index === -1) return null;

  const raiAtualizado = {
    ...raisMock[index],
    ...data,
    id: raisMock[index].id,
  };

  raiAtualizado.relacionamento = Array.isArray(raiAtualizado.relacionamento)
    ? [...raiAtualizado.relacionamento]
    : [];

  raiAtualizado.habilidadesCognitivas = Array.isArray(
    raiAtualizado.habilidadesCognitivas,
  )
    ? [...raiAtualizado.habilidadesCognitivas]
    : [];

  raiAtualizado.habilidadesSocioemocionais = Array.isArray(
    raiAtualizado.habilidadesSocioemocionais,
  )
    ? [...raiAtualizado.habilidadesSocioemocionais]
    : [];

  raiAtualizado.habilidadesCompetencias = normalizarHabilidades(
    raiAtualizado.habilidadesCompetencias,
  );

  raisMock[index] = raiAtualizado;

  return raiAtualizado;
}

export function deleteRai(id) {
  const index = raisMock.findIndex((rai) => String(rai.id) === String(id));

  if (index === -1) return false;

  raisMock.splice(index, 1);

  return true;
}
