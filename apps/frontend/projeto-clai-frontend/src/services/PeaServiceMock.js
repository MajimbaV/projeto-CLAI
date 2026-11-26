const peasMock = [
  {
    id: "pea-2024001-1",
    alunoId: "550e8400-e29b-41d4-a716-446655440001",
    alunoMatricula: "2024001",
    peiId: "550e8400-e29b-41d4-a716-446655440000",
    componenteCurricular: "Matemática",
    semestreAno: "2026.1",
    docente: "Mariana Alves",
    objetivoGeral:
      "Desenvolver habilidades matemáticas básicas por meio de atividades contextualizadas.",
    objetivosEspecificos:
      "Reconhecer números, comparar quantidades e resolver operações simples.",
    conteudosProgramaticos:
      "Sistema de numeração, adição, subtração e resolução de problemas.",
    metodologia:
      "Atividades visuais, manipulação de materiais concretos e acompanhamento individual.",
    avaliacao:
      "Avaliação contínua considerando participação, registros e compreensão dos conceitos.",
    bibliografiaBasica: "Material pedagógico adaptado da escola.",
    bibliografiaComplementar: "Jogos educativos e recursos digitais acessíveis.",
  },
  {
    id: "pea-2024002-1",
    alunoId: "550e8400-e29b-41d4-a716-446655440004",
    alunoMatricula: "2024002",
    peiId: "550e8400-e29b-41d4-a716-446655440003",
    componenteCurricular: "Língua Portuguesa",
    semestreAno: "2026.1",
    docente: "Paulo Ribeiro",
    objetivoGeral:
      "Ampliar a compreensão textual e a produção escrita em situações cotidianas.",
    objetivosEspecificos:
      "Identificar informações explícitas e produzir textos curtos com apoio.",
    conteudosProgramaticos:
      "Leitura compartilhada, gêneros textuais e escrita assistida.",
    metodologia:
      "Textos curtos, recursos visuais e tempo adicional para realização das atividades.",
    avaliacao:
      "Observação das estratégias utilizadas e instrumentos adaptados.",
    bibliografiaBasica: "Acervo escolar adaptado.",
    bibliografiaComplementar: "Leituras digitais acessíveis.",
  },
];

export function getPeas({ page = 0, size = 20, filters = {} } = {}) {
  const filteredPeas = peasMock.filter((pea) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === "" || value === null || value === undefined) return true;
      return pea[key] === value;
    }),
  );
  const start = page * size;
  const content = filteredPeas.slice(start, start + size);

  return {
    content,
    totalElements: filteredPeas.length,
    totalPages: size > 0 ? Math.ceil(filteredPeas.length / size) : 0,
    size,
    number: page,
    numberOfElements: content.length,
    first: page === 0,
    last: start + size >= filteredPeas.length,
    empty: content.length === 0,
  };
}

