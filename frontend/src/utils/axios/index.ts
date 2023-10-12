// axiosInstance.ts

import axios from 'axios';
import {
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
} from '../token/index'; // Replace with your token management utility

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
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

axios.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response;
  },
  (error) => {
    // Handle errors here
    if (error.response) {
      // You can access response data from error.response
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = getRefreshToken();
      try {
        const response = await axios.post(
          'http://localhost:8000/accounts/api/v1/jwt/refresh/',
          {
            refresh,
          }
        );
        console.log('interceptor');
        const newAccessToken = response.data.access;
        setToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError: any) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
