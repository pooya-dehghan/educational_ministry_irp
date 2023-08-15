import axios from 'axios';
import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
} from './interface/interface';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const authApi = {
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/login/`,
        loginData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verify: async (verifyData: VerifyRequest) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/jwt/verify/`,
        verifyData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
