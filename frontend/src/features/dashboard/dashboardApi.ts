import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export interface DashboardRequest {
  username: string;
  password: string;
}

export interface DashboardResponse {
  username: string;
  name: string;
  sideBarList: string[];
}

export const dashboardApi = {
  getDashboard: async (
    DashboardData: DashboardRequest
  ): Promise<DashboardResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, DashboardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
