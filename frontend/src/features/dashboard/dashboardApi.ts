import axiosInstance from '../../utils/axios/index';

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
  getDashboard: async (): Promise<DashboardResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/accounts/api/v1/dashbordlist/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
