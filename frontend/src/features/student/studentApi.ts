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
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const studentApi = {
  getstudent: async (
    getData: GetstudentRequest
  ): Promise<GetstudentResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/student/api/v1/get/${getData.studentID}`
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
      const response = await axiosInstance.post(
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
      const response = await axiosInstance.post(
        `${API_BASE_URL}/students/api/v1/delete/${deleteData.id}`,
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
