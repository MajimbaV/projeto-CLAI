import api from './api'

export async function postPei(data) {
    const response = await api.post('/peis', data);
    return response.data;
}

export async function getPeis({ page = 0, size = 20, sort = 'id,asc', filters } = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }
    const response = await api.get('/peis', { params: { page, size, sort, ...filters } });
    return response.data;
}

export async function getPeiById(id) {
    const response = await api.get(`/peis/${id}`);
    return response.data;
}

export async function putPei(id, data) {
    const response = await api.put(`/peis/${id}`, data);
    return response.data;
}

export async function deletePei(id) {
    const response = await api.delete(`/peis/${id}`);
    return response.data;
}