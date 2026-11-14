const peisMock = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        alunoId: '550e8400-e29b-41d4-a716-446655440001',
        alunoNome: 'Ana Carolina Souza',
        alunoMatricula: '2024001',
        historico: 'Histórico escolar do aluno.',
        necessidadesEspecificas: 'Necessidades específicas do aluno.',
        conhecimentosHabilidadesInteresses: 'Conhecimentos, habilidades e interesses do aluno.',
        dificuldadesApresentadas: 'Dificuldades apresentadas pelo aluno.',
        propostasAdaptacoes: 'Propostas de adaptações curriculares.',
        ativo: true,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        alunoId: '550e8400-e29b-41d4-a716-446655440004',
        alunoNome: 'Bruno Henrique Lima',
        alunoMatricula: '2024002',
        historico: 'Aluno com bom desempenho em atividades práticas.',
        necessidadesEspecificas: 'Acompanhamento pedagógico individualizado.',
        conhecimentosHabilidadesInteresses: 'Interesse por matemática, jogos e tecnologia.',
        dificuldadesApresentadas: 'Dificuldade de concentração em atividades extensas.',
        propostasAdaptacoes: 'Divisão das atividades em etapas menores e uso de recursos visuais.',
        ativo: true,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440005',
        alunoId: '550e8400-e29b-41d4-a716-446655440006',
        alunoNome: 'Beatriz Oliveira Santos',
        alunoMatricula: '2024003',
        historico: 'Histórico escolar com evolução gradual na alfabetização.',
        necessidadesEspecificas: 'Suporte para leitura e produção textual.',
        conhecimentosHabilidadesInteresses: 'Interesse por literatura, desenhos e atividades artísticas.',
        dificuldadesApresentadas: 'Dificuldade na leitura de textos longos.',
        propostasAdaptacoes: 'Textos adaptados, leitura compartilhada e tempo adicional.',
        ativo: true,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440007',
        alunoId: '550e8400-e29b-41d4-a716-446655440008',
        alunoNome: 'Carlos Eduardo Mendes',
        alunoMatricula: '2024004',
        historico: 'Participação regular nas atividades escolares.',
        necessidadesEspecificas: 'Necessidade de rotina estruturada.',
        conhecimentosHabilidadesInteresses: 'Interesse por ciências, experiências e música.',
        dificuldadesApresentadas: 'Dificuldade em mudanças inesperadas de rotina.',
        propostasAdaptacoes: 'Antecipação das atividades e uso de cronograma visual.',
        ativo: false,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440009',
        alunoId: '550e8400-e29b-41d4-a716-446655440010',
        alunoNome: 'Daniela Ferreira Costa',
        alunoMatricula: '2024005',
        historico: 'Bom desempenho em atividades orais e colaborativas.',
        necessidadesEspecificas: 'Apoio no desenvolvimento da autonomia escolar.',
        conhecimentosHabilidadesInteresses: 'Interesse por esportes, teatro e trabalhos em grupo.',
        dificuldadesApresentadas: 'Dificuldade na organização dos materiais escolares.',
        propostasAdaptacoes: 'Lista de tarefas, organização guiada e avaliações diversificadas.',
        ativo: true,
    },
];

export function postPei(data) {
    return {
        ...peisMock[0],
        ...data,
        id: '550e8400-e29b-41d4-a716-446655440002',
    };
}

export function getPeis({ page = 0, size = 20, filters = {} } = {}) {
    const filteredPeis = peisMock.filter((pei) =>
        Object.entries(filters).every(([key, value]) =>
            value === '' || value === null || value === undefined || pei[key] === value
        )
    );
    const start = page * size;
    const content = filteredPeis.slice(start, start + size);

    return {
        content,
        totalElements: filteredPeis.length,
        totalPages: size > 0 ? Math.ceil(filteredPeis.length / size) : 0,
        size,
        number: page,
        numberOfElements: content.length,
        first: page === 0,
        last: start + size >= filteredPeis.length,
        empty: content.length === 0,
    };
}

export function getPeiById(id) {
    return peisMock.find((pei) => pei.id === id) || null;
}

export function putPei(id, data) {
    const pei = getPeiById(id);
    return pei ? { ...pei, ...data, id } : null;
}

export function deletePei(id) {
    return getPeiById(id) !== null;
}
