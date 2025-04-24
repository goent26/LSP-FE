import api from './ApiClient';

export const registPeserta = async ({ username, email, password }) => {
    const response = await api.post('/register', {
        username,
        email,
        password,
    });

    return response.data;
};

export const login = async ({ email, password }) => {
    const response = await api.post('/login', {
        email,
        password,
    });

    return response.data;
};