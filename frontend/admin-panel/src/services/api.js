// import axios from "axios";
// import { BASE_URL, STORAGE_KEYS } from "../utils/constants";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // Automatically attach token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Global error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = "/admin/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // prevent infinite loading
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Server responded but error occurred
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        window.location.href = "/admin/login";
      }

      console.error("API Error:", error.response.data);
    } 
    // No response (server down / net issue)
    else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
