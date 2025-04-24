import api from './ApiClient';

export const registPeserta = async ({ username, email, password }) => {
    const response = await api.post('/api/register', {
        username,
        email,
        password,
    });

    return response.data;
};

export const login = async ({ email, password }) => {
    console.log('email', email);
    console.log('password', password);
    const response = await api.post('/api/login', {
        email: email,
        password: password,
    });
    console.log('response', response);

    return response.data;
};