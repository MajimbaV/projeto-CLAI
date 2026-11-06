import api from './api';

export async function postAluno(data) {
    const response = await api.post('/alunos', data);
    return response.data;
}

export async function getAlunos(page = 0, size = 10, sort = 'alunoNome,asc') {
    const response = await api.get('/alunos', {
        params: {
            page,
            size,
            sort
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

export async function deleteAluno(matricula) {
    const response = await api.delete(`/alunos/matricula/${matricula}`);
    return response.data;
}

export async function ativarAluno(matricula) {
    const response = await api.patch(`/alunos/matricula/${matricula}/ativar`);
    return response.data;
}