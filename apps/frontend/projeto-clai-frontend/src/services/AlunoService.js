import api from './api';

export async function postAluno(data) {
    const response = await api.post('/alunos', data);
    return response.data;
}