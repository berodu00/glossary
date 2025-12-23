import apiClient from './axiosClient';

export const bookmarkApi = {
    toggle: async (termId: number): Promise<{ bookmarked: boolean }> => {
        const { data } = await apiClient.post<{ bookmarked: boolean }>(`/bookmarks/${termId}`);
        return data;
    },

    getMyBookmarks: async (): Promise<number[]> => {
        const { data } = await apiClient.get<number[]>('/bookmarks/me');
        return data;
    }
};
