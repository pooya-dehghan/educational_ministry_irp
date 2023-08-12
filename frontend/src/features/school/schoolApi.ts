import axios from 'axios';
import {
  GetAllSchoolsRequest,
  GetAllSchoolsResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const schoolApi = {
  getAllSchools: async (
    getData: GetAllSchoolsRequest
  ): Promise<GetAllSchoolsResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/school/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
