import api from './api.js';

export async function postEstudoCaso(data) {
    const response = await api.post('/estudos-de-caso', data);
    return response.data;
}