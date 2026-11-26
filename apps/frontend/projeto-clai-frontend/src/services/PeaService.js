import api from './api';

export async function postPea(data) {
    const response = await api.post('/peas', data);
    return response.data;
}

