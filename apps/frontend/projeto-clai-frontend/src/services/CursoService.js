import api from './api';

export async function postCurso(data) {
    const response = await api.post('/cursos', data);
    return response.data;
}

export async function getCursos({page = 0, size = 10, sort = 'cursoNome,asc', filters} = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }
    const response = await api.get('/cursos', {
        params: {
            page,
            size,
            sort,
            ...filters
        }
    });
    return response.data;
}

export async function getCursoById(id) {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
}

export async function getCursoBySigla(sigla) {
    const response = await api.get(`/cursos/sigla/${sigla}`);
    return response.data;
}

export async function putCurso(id, data) {
    const response = await api.put(`/cursos/${id}`, data);
    return response.data;
}

export async function deleteCurso(id) {
    const response = await api.delete(`/cursos/${id}`);
    return response.data;
}

export async function ativarCurso(id) {
    const response = await api.patch(`/cursos/${id}/ativar`);
    return response.data;
}