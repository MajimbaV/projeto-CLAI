import api from './api'

export function postPei(data) {
    const response = api.post('/peis', data);
    return response.data;
}

export function getPeis({ page = 0, size = 20, sort = 'id,asc', filters } = {}) {
    for (const key in filters) {
        if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
            delete filters[key];
        }
    }
    const response = api.get('/peis', { params: { page, size, sort, ...filters } });
    return response.data;
}

export function getPeiById(id) {
    const response = api.get(`/peis/${id}`);
    return response.data;
}

export function putPei(id, data) {
    const response = api.put(`/peis/${id}`, data);
    return response.data;
}

export function deletePei(id) {
    const response = api.delete(`/peis/${id}`);
    return response.data;
}