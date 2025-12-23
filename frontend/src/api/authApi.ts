import apiClient from './axiosClient';

export interface LoginResponse {
    accessToken: string;
}

export const authApi = {
    devLogin: async (userId: string, role?: string): Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>('/auth/dev-login', { userId, role });
        return data;
    }
};
