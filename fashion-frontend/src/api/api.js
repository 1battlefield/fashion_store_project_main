import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Thiết lập địa chỉ backend mặc định
});

// Đoạn code này sẽ tự động gắn token vào mỗi request nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
