// axiosInstance.ts

import axios from 'axios';
import { getToken, setToken } from '../token/index'; // Replace with your token management utility

const instance = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your API base URL
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Call your token refresh endpoint here and update token in local storage
      const refreshToken = 'your-refresh-token'; // Replace with your refresh token
      try {
        const response = await axios.post('/refresh-token', { refreshToken });
        const newAccessToken = response.data.access_token;
        setToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Handle refresh error, e.g. logout user or redirect to login page
        console.error('Refresh token failed:', refreshError);
        // You might want to logout the user or redirect to a login page
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
