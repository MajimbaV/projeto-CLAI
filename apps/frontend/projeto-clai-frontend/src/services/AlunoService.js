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