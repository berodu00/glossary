import apiClient from './axiosClient';

export interface SearchLog {
    id: number;
    keyword: string;
    createdAt: string;
}

export const logApi = {
    getRecent: async (): Promise<SearchLog[]> => {
        const { data } = await apiClient.get<SearchLog[]>('/search-logs/recent');
        return data;
    }
};
