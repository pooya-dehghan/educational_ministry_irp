import axios from 'axios';
import {
  CreateschoolRequest,
  CreateschoolResponse,
  DeleteschooleRequest,
  DeleteschoolResponse,
  GetAllschoolsRequest,
  GetAllschoolsResponse,
  GetschoolRequest,
  GetschoolResponse,
  UpdateschoolRequest,
  UpdateschoolResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const schoolApi = {
  getschool: async (
    getData: GetschoolRequest
  ): Promise<GetschoolResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createschool: async (
    createData: CreateschoolRequest
  ): Promise<CreateschoolResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateschool: async (
    updateData: UpdateschoolRequest
  ): Promise<UpdateschoolResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteschool: async (
    deleteData: DeleteschooleRequest
  ): Promise<DeleteschoolResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllschools: async (
    getData: GetAllschoolsRequest
  ): Promise<GetAllschoolsResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
