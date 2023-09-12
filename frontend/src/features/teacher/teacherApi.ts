import axiosInstance from '../../utils/axios/index';
import {
  CreateteacherRequest,
  CreateteacherResponse,
  DeleteteachereRequest,
  DeleteteacherResponse,
  GetAllteachersRequest,
  GetAllteachersResponse,
  GetteacherRequest,
  GetteacherResponse,
  UpdateteacherRequest,
  UpdateteacherResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const teacherApi = {
  getteacher: async (
    getData: GetteacherRequest
  ): Promise<GetteacherResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createteacher: async (
    createData: CreateteacherRequest
  ): Promise<CreateteacherResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/teacher/api/v1/create/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateteacher: async (
    updateData: UpdateteacherRequest
  ): Promise<UpdateteacherResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteteacher: async (
    deleteData: DeleteteachereRequest
  ): Promise<DeleteteacherResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllteachers: async (
    getData: GetAllteachersRequest
  ): Promise<GetAllteachersResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/teacher/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
