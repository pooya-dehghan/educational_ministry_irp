import axios from 'axios';
import {
  GetAllProfessorRequest,
  GetAllProfessorResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const professorApi = {
  getAllSchools: async (
    getData: GetAllProfessorRequest
  ): Promise<GetAllProfessorResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/professor/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
