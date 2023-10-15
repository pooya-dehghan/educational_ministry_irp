import axiosInstance from '../../utils/axios/index';
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
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL

export const studentApi = {
  getstudent: async (
    getData: GetstudentRequest
  ): Promise<GetstudentResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/student/api/v1/get/${getData.studentID}/`
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
      const response = await axiosInstance.post(
        `${API_BASE_URL}/student/api/v1/create/`,
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
      const response = await axiosInstance.put(
        `${API_BASE_URL}/student/api/v1/update/${updateData.studentID}/`,
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
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/student/api/v1/delete/${deleteData.id}/`
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
      const response = await axiosInstance.get(
        `${API_BASE_URL}/student/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
