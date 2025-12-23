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

// Request Interceptor: Add Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear storage and redirect to login if 401 occurs
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
