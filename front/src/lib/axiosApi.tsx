import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://localhost:7166",
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
        return response;
    },
    (error) => {
        // Handle response errors
        return Promise.reject(error);
    }
);

export default api;