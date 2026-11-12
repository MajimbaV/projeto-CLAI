import api from './api.js';

export async function postEstudoCaso(data) {
    const response = await api.post('/estudos-de-caso', data);
    return response.data;
}

export async function postEstudoCasoCombinado(data) {
    const response = await api.post('/estudos-de-caso/combinado', data);
    return response.data;
}

export async function getEstudosCaso({page = 0, size = 5, sort = 'id,asc', filters} = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }
    const response = await api.get('/estudos-de-caso', {
        params: {
            page,
            size,
            sort,
            ...filters
        }
    });
    return response.data;
}

export async function getEstudoCaso(id) {
    const response = await api.get(`/estudos-de-caso/${id}`);
    return response.data;
}

export async function putEstudoCaso(id, data){
    const response = await api.put(`/estudos-de-caso/${id}`, data);
    return response.data;
}