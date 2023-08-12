import axios from 'axios';
import {
  GetAllStudentsRequest,
  GetAllStudentsResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const studentApi = {
  getAllSchools: async (
    getData: GetAllStudentsRequest
  ): Promise<GetAllStudentsResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
