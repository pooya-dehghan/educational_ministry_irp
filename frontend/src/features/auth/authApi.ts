import axios from 'axios';
import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest
} from './interface/interface';
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL

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
  changePassword: async (changePassData: ChangePasswordRequest) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/changepassword/`,
        changePassData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (forgotPass: ForgotPasswordRequest) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/forgot/`,
        forgotPass
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
