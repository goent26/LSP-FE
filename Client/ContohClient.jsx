import axiosInstance from './ApiClient';

export const getTa = (params) => axiosInstance.get('/ta', { params });

export const postTa = (payload) => axiosInstance.post('/ta', payload);

export const editTa = (id, payload) => axiosInstance.put(`/ta/${id}`, payload);

export const deleteTa = (id) => axiosInstance.delete(`/ta/${id}`);

export const getRootMessage = () => {
    return axiosInstance.get('/'); // ini hit ke http://localhost:8000/
};