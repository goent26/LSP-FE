import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('lsp-token');
            if (token) {
                config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
