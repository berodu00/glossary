import apiClient from './axiosClient';
import type { CreateSuggestionRequest, Suggestion } from '../types';

export const suggestionApi = {
    create: async (request: CreateSuggestionRequest): Promise<void> => {
        await apiClient.post('/suggestions', request);
    },

    getPending: async (): Promise<Suggestion[]> => {
        const { data } = await apiClient.get<Suggestion[]>('/suggestions/pending');
        return data;
    },

    approve: async (id: number): Promise<void> => {
        await apiClient.post(`/suggestions/${id}/approve`);
    },

    reject: async (id: number, reason: string): Promise<void> => {
        await apiClient.post(`/suggestions/${id}/reject`, { reason });
    }
};
