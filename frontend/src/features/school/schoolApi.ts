import axiosInstance from '../../utils/axios/index';
import {
  CreateSchoolRequest,
  CreateSchoolResponse,
  DeleteSchooleRequest,
  DeleteSchoolResponse,
  GetAllSchoolsRequest,
  GetAllSchoolsResponse,
  GetSchoolRequest,
  GetSchoolResponse,
  UpdateSchoolRequest,
  UpdateSchoolResponse,
} from './interface';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const schoolApi = {
  getschool: async (getData: GetSchoolRequest): Promise<GetSchoolResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/school/api/v1/get/${getData.schoolID}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createschool: async (
    createData: CreateSchoolRequest
  ): Promise<CreateSchoolResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/school/api/v1/create/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateschool: async (
    updateData: UpdateSchoolRequest
  ): Promise<UpdateSchoolResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/accounts/api/v1/school/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteschool: async (
    deleteData: DeleteSchooleRequest
  ): Promise<DeleteSchoolResponse> => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/school/api/v1/delete/${deleteData.id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllschools: async (
    getData: GetAllSchoolsRequest
  ): Promise<GetAllSchoolsResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/school/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
