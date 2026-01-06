import apiClient from './axiosClient';

export interface FileUploadResponse {
    url: string;
}

export const fileApi = {
    upload: async (file: File): Promise<FileUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await apiClient.post<FileUploadResponse>('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    }
};
