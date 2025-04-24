import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://143.198.118.227:8050',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('lsp-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;