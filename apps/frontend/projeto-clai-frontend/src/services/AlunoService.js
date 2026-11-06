import api from './api';

export async function postAluno(data) {
    const response = await api.post('/alunos', data);
    return response.data;
}

export async function getAlunos({page = 0, size = 10, sort = 'alunoNome,asc', filters} = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }


    const response = await api.get('/alunos', {
        params: {
            page,
            size,
            sort,
            ...filters
        }
    });
    return response.data;
}

export async function getAlunoByMatricula(matricula) {
    const response = await api.get(`/alunos/matricula/${matricula}`);
    return response.data;
}

export async function putAluno(id, data) {
    const response = await api.put(`/alunos/${id}`, data);
    return response.data;
}