import axios from "axios";

interface AuthObj {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  access_token: string;
}
// Define your API base URL
const API_BASE_URL = "http://localhost:3001/api";

// Create an instance of Axios with default configurations
const api = axios.create({
  baseURL: API_BASE_URL,
  // You can add additional default configurations here
});

// Optional: Add request interceptors
api.interceptors.request.use(
  (config: any): any => {
    const authObj: string | unknown | any = localStorage.getItem("user_info");
    const auth: AuthObj = JSON.parse(authObj);
    if (auth?.access_token) {
      config.headers["Authorization"] = `Bearer ${auth.access_token}`;
      // config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
