const raisMock = [
  {
    id: "660e8400-e29b-41d4-a716-446655440000",
    alunoId: "550e8400-e29b-41d4-a716-446655440001",
    peiId: "550e8400-e29b-41d4-a716-446655440000",
    alunoNome: "Ana Carolina Souza",
    alunoMatricula: "2024001",

    componenteCurricular: "Língua Portuguesa",
    periodoLetivo: "2026.1",
    docente: "Professor(a) responsável",

    relacionamento: ["Afetivo", "Socializado"],
    relacionamentoOutro: "",
    comentarioRelacionamento:
      "Apresenta boa interação com colegas e professores.",

    habilidadesCognitivas: ["Foco", "Memória", "Atenção"],
    habilidadesCognitivasOutro: "",
    comentarioHabilidadesCognitivas:
      "Demonstra atenção durante atividades orientadas.",

    habilidadesSocioemocionais: ["Empatia", "Autonomia", "Confiança"],
    habilidadesSocioemocionaisOutro: "",
    comentarioHabilidadesSocioemocionais:
      "Apresenta evolução na realização de atividades individuais e coletivas.",

    avancosGerais:
      "Apresentou avanços na participação das atividades e na interação com os colegas.",

    dificuldadesAprendizagem:
      "Ainda apresenta dificuldades na interpretação de textos mais extensos.",

    fatoresExternos:
      "Não foram identificados fatores externos relevantes durante o período.",

    habilidadesDesenvolvidas: [
      {
        habilidade: "Compreensão de textos",
        nivelAprendizado: "Bom",
        observacoes: "Apresentou evolução na interpretação textual.",
      },
      {
        habilidade: "Produção textual",
        nivelAprendizado: "Satisfatório",
        observacoes: "Necessita de acompanhamento em atividades mais extensas.",
      },
      {
        habilidade: "Comunicação oral",
        nivelAprendizado: "Ótimo",
        observacoes: "Participa das atividades e expressa suas ideias.",
      },
      {
        habilidade: "Leitura",
        nivelAprendizado: "Bom",
        observacoes: "Apresenta progresso na leitura compartilhada.",
      },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
    ],

    parecer:
      "A estudante apresentou avanços em relação aos objetivos propostos no PEA. As adaptações realizadas contribuíram para sua participação nas atividades. Recomenda-se manter o acompanhamento e ampliar gradualmente as atividades de interpretação textual.",

    data: "2026-06-30",
    assinaturaDocente: "Professor(a) responsável",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    alunoId: "550e8400-e29b-41d4-a716-446655440004",
    peiId: "550e8400-e29b-41d4-a716-446655440003",
    alunoNome: "Bruno Henrique Lima",
    alunoMatricula: "2024002",

    componenteCurricular: "Matemática",
    periodoLetivo: "2026.1",
    docente: "Professor(a) responsável",

    relacionamento: ["Socializado"],
    relacionamentoOutro: "",
    comentarioRelacionamento:
      "Interage bem com os colegas, especialmente em atividades em grupo.",

    habilidadesCognitivas: ["Memória", "Criatividade"],
    habilidadesCognitivasOutro: "",
    comentarioHabilidadesCognitivas:
      "Demonstra facilidade na resolução de problemas práticos.",

    habilidadesSocioemocionais: ["Autonomia", "Paciência", "Compromisso"],
    habilidadesSocioemocionaisOutro: "",
    comentarioHabilidadesSocioemocionais:
      "Apresenta evolução na organização e execução das tarefas.",

    avancosGerais:
      "Apresentou melhora na participação e na realização das atividades propostas.",

    dificuldadesAprendizagem:
      "Apresenta dificuldade em manter a concentração durante atividades extensas.",

    fatoresExternos:
      "A duração das atividades e o ambiente com muitos estímulos podem interferir na concentração.",

    habilidadesDesenvolvidas: [
      {
        habilidade: "Resolução de problemas",
        nivelAprendizado: "Bom",
        observacoes: "Resolve problemas com apoio de recursos visuais.",
      },
      {
        habilidade: "Raciocínio lógico",
        nivelAprendizado: "Ótimo",
        observacoes: "Demonstra facilidade em atividades práticas.",
      },
      {
        habilidade: "Operações matemáticas",
        nivelAprendizado: "Satisfatório",
        observacoes: "Necessita de orientações em algumas etapas.",
      },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
      { habilidade: "", nivelAprendizado: "", observacoes: "" },
    ],

    parecer:
      "O estudante apresentou avanços no raciocínio lógico e na resolução de problemas. A divisão das atividades em etapas menores e o uso de recursos visuais demonstraram bons resultados. Recomenda-se manter as estratégias e trabalhar gradualmente a autonomia.",

    data: "2026-06-30",
    assinaturaDocente: "Professor(a) responsável",
  },
];

function gerarId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `rai-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function postRai(data) {
  const novoRai = {
    ...raisMock[0],
    ...data,
    id: gerarId(),
  };

  raisMock.push(novoRai);

  return novoRai;
}

export function getRais({ page = 0, size = 20, filters = {} } = {}) {
  const filteredRais = raisMock.filter((rai) =>
    Object.entries(filters).every(
      ([key, value]) =>
        value === "" ||
        value === null ||
        value === undefined ||
        rai[key] === value,
    ),
  );

  const start = page * size;
  const content = filteredRais.slice(start, start + size);

  return {
    content,
    totalElements: filteredRais.length,
    totalPages: size > 0 ? Math.ceil(filteredRais.length / size) : 0,
    size,
    number: page,
    numberOfElements: content.length,
    first: page === 0,
    last: start + size >= filteredRais.length,
    empty: content.length === 0,
  };
}

export function getRaiById(id) {
  return raisMock.find((rai) => rai.id === id) || null;
}

export function putRai(id, data) {
  const index = raisMock.findIndex((rai) => rai.id === id);

  if (index === -1) return null;

  const raiAtualizado = {
    ...raisMock[index],
    ...data,
    id,
  };

  raisMock[index] = raiAtualizado;

  return raiAtualizado;
}

export function deleteRai(id) {
  const index = raisMock.findIndex((rai) => rai.id === id);

  if (index === -1) return false;

  raisMock.splice(index, 1);

  return true;
}
