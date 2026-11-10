import api from './api';

export async function getPlanosAcao({
  page = 0,
  size = 20,
  sort = 'dataPlano,desc',
  matriculaAluno,
  nomeAluno,
  statusAtivo,
} = {}) {
  const params = { page, size, sort };

  if (matriculaAluno) params.matriculaAluno = matriculaAluno;
  if (nomeAluno) params.nomeAluno = nomeAluno;
  if (typeof statusAtivo === 'boolean') params.statusAtivo = statusAtivo;

  const response = await api.get('/plano-acao', { params });
  return response.data;
}

export async function getPlanoAcaoById(id) {
  const response = await api.get(`/plano-acao/${id}`);
  return response.data;
}

export async function postPlanoAcao(data) {
  const response = await api.post('/plano-acao', data);
  return response.data;
}

export async function putPlanoAcao(id, data) {
  const response = await api.put(`/plano-acao/${id}`, data);
  return response.data;
}

