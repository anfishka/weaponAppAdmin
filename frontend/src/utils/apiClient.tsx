import axios from "axios";

// Создаём экземпляр axios
const apiClient = axios.create({
  baseURL: "http://localhost:7185/api", // Укажите базовый URL вашего API
});

// Добавляем interceptor для токена
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Берём токен из localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
