import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

interface AuthObj {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  access_token: string;
}

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const authObj: string | null = localStorage.getItem("avocado_auth");
    const auth: AuthObj = authObj ? JSON.parse(authObj) : {};
    config.headers = config.headers || {}; // Initialize headers if undefined
    if (auth) {
      const { access_token } = auth;
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        config.withCredentials = true;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
