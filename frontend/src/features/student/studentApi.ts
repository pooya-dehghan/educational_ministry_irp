import axios from 'axios';
import {
  CreatestudentRequest,
  CreatestudentResponse,
  DeletestudenteRequest,
  DeletestudentResponse,
  GetAllstudentsRequest,
  GetAllstudentsResponse,
  GetstudentRequest,
  GetstudentResponse,
  UpdatestudentRequest,
  UpdatestudentResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const studentApi = {
  getstudent: async (
    getData: GetstudentRequest
  ): Promise<GetstudentResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/student/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createstudent: async (
    createData: CreatestudentRequest
  ): Promise<CreatestudentResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/student/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatestudent: async (
    updateData: UpdatestudentRequest
  ): Promise<UpdatestudentResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/student/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletestudent: async (
    deleteData: DeletestudenteRequest
  ): Promise<DeletestudentResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/student/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllstudents: async (
    getData: GetAllstudentsRequest
  ): Promise<GetAllstudentsResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/student/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
