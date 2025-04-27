import axios from "axios";
import api from './ApiClient';
import { CreateTUKData, TUK, UpdateTUKData } from "./types/types";

const baseEndpoint = "/tuk";


const tukClient = {
    async getAll(filter: Record<string, unknown> = {}): Promise<TUK[]> {
        const response = await api.get(baseEndpoint, { params: filter });
        return response.data.payload.data as TUK[];
    },

    async getOneById(id: string): Promise<TUK> {
        const response = await api.get(`${baseEndpoint}/${id}`);
        return response.data.payload.data;
    },

    async createOne(data: CreateTUKData): Promise<TUK> {
        const response = await api.post(baseEndpoint, data);
        return response.data.payload.data;
    },

    async updateOneById(id: string, data: UpdateTUKData): Promise<TUK> {
        const response = await api.put(`${baseEndpoint}/${id}`, data);
        return response.data.payload.data;
    },

    async deleteOneById(id: string): Promise<TUK> {
        const response = await api.delete(`${baseEndpoint}/${id}`);
        return response.data.payload.data;
    },

    async isExist(id: string): Promise<boolean> {
        try {
            await this.getOneById(id);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    },
};

export default tukClient;