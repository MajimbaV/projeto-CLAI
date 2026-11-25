import api from './api';

export async function getPlanosAcao({page = 0, size = 20, sort = 'dataPlano,desc', filters} = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }
    
    const response = await api.get('/plano-acao', {
        params: {
            page,
            size,
            sort,
            ...filters
        }
    });
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

