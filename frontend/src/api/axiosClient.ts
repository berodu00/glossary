import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

interface ErrorResponse {
    code: string;
    message: string;
}

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        if (error.response && error.response.data) {
            const { code, message } = error.response.data;
            console.error(`API Error [${code}]: ${message}`);
            // Here we can dispatch a global toast/notification event
        } else {
            console.error('Network or Unknown Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
