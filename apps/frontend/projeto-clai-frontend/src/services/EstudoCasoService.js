import api from './api.js';

export async function postEstudoCaso(data) {
    const response = await api.post('/estudos-de-caso', data);
    return response.data;
}

export async function postEstudoCasoCombinado(data) {
    const response = await api.post('/estudos-de-caso/combinado', data);
    return response.data;
}