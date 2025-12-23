import apiClient from './axiosClient';
import type { Page, SearchParams, Term, TermDetail } from '../types';

export const termApi = {
    search: async (params: SearchParams): Promise<Page<Term>> => {
        const { data } = await apiClient.get<Page<Term>>('/terms', { params });
        return data;
    },

    getDetail: async (id: number): Promise<TermDetail> => {
        const { data } = await apiClient.get<TermDetail>(`/terms/${id}`);
        return data;
    }
};
