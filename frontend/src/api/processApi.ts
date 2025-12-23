import apiClient from './axiosClient';
import type { Process } from '../types';

export const processApi = {
    getAll: async (): Promise<Process[]> => {
        const { data } = await apiClient.get<Process[]>('/processes');
        return data;
    }
};
