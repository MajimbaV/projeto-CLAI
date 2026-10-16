import api from './api';

export async function postAluno(data) {
    const response = await api.post('/alunos', data);
    return response.data;
}

export async function getAlunos() {
    const response = await api.get('/alunos');
    return response.data;
}

export async function getAlunoByMaticula(matricula) {
    const response = await api.get(`/alunos/matricula/${matricula}`);
    return response.data;
}