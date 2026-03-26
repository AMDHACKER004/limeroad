import axios from "axios";

const API = axios.create({
  baseURL: "https://limeroad-isdv.onrender.com/api",
});

// 🔥 Automatically attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
