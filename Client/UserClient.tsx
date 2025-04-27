import api from './ApiClient';
import { User, CreateUserPayload, UpdateUserPayload, Peserta, Asesor } from './types/types';

export const PesertaClient = {
    getAll: async (query: Record<string, string> = {}): Promise<Peserta[]> => {
        const params = new URLSearchParams(query).toString();
        const res = await api.get(`/users/peserta${params ? `?${params}` : ''}`);
        return res.data.payload.data as Peserta[];
    },

    getOneById: async (id: number): Promise<User> => {
        const res = await api.get(`/users/peserta/${id}`);
        return res.data.payload.data as User;
    },

    createOne: async (payload: CreateUserPayload): Promise<User> => {
        const res = await api.post('/users/peserta', payload);
        return res.data.payload.data as User;
    },

    updateOneById: async (id: number, payload: UpdateUserPayload): Promise<User> => {
        const res = await api.put(`/users/peserta/${id}`, payload);
        return res.data.payload.data as User;
    },

    deleteOneById: async (id: number): Promise<void> => {
        await api.delete(`/users/peserta/${id}`);
    },
};


export const AsesorClient = {
    getAll: async (query: Record<string, string> = {}): Promise<Asesor[]> => {
        const params = new URLSearchParams(query).toString();
        const res = await api.get(`/users/asesor${params ? `?${params}` : ''}`);
        return res.data.payload.data as Asesor[];
    },

    getOneById: async (id: number): Promise<User> => {
        const res = await api.get(`/users/asesor/${id}`);
        return res.data.payload.data as User;
    },

    createOne: async (payload: CreateUserPayload): Promise<User> => {
        const res = await api.post('/users/asesor', payload);
        return res.data.payload.data as User;
    },

    updateOneById: async (id: number, payload: UpdateUserPayload): Promise<User> => {
        const res = await api.put(`/users/asesor/${id}`, payload);
        return res.data.payload.data as User;
    },

    deleteOneById: async (id: number): Promise<void> => {
        await api.delete(`/users/asesor/${id}`);
    },
};

