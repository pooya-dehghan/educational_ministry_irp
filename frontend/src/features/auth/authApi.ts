import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Your API base URL

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    // Other user data
  };
}

export const authApi = {
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
