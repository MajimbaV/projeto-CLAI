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
