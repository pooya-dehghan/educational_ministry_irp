import axios from 'axios';
import {
  CreateTeacherRequest,
  CreateTeacherResponse,
  GetAllTeachersRequest,
  GetAllTeachersResponse,
  GetTeacherRequest,
  GetTeacherResponse,
  DeleteTeacherRequest,
  DeleteTeacherResponse,
  UpdateTeacherRequest,
  UpdateTeacherResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const teacherApi = {
  getTeacher: async (
    getData: GetTeacherRequest
  ): Promise<GetTeacherResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTeacher: async (
    createData: CreateTeacherRequest
  ): Promise<CreateTeacherResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTeacher: async (
    updateData: UpdateTeacherRequest
  ): Promise<UpdateTeacherResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTeacher: async (
    deleteData: DeleteTeacherRequest
  ): Promise<DeleteTeacherResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllOfficeManagers: async (
    getData: GetAllTeachersRequest
  ): Promise<GetAllTeachersResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/teacher/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
