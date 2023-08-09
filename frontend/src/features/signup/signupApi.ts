import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export interface SignUpRequest {
  username: string;
  password: string;
  password_confirmation: string;
}

export interface SignUpResponse {
  token: string;
  user: {
    id: number;
    username: string;
    // Other user data
  };
}

export const signUpApi = {
  signup: async (signUpData: SignUpRequest): Promise<SignUpResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/registration/`,
        signUpData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
