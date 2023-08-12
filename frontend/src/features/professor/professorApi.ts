import axios from 'axios';
import {
  CreateprofessorRequest,
  CreateprofessorResponse,
  DeleteprofessoreRequest,
  DeleteprofessorResponse,
  GetAllprofessorsRequest,
  GetAllprofessorsResponse,
  GetprofessorRequest,
  GetprofessorResponse,
  UpdateprofessorRequest,
  UpdateprofessorResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const professorApi = {
  getprofessor: async (
    getData: GetprofessorRequest
  ): Promise<GetprofessorResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/professor/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createprofessor: async (
    createData: CreateprofessorRequest
  ): Promise<CreateprofessorResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/professor/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateprofessor: async (
    updateData: UpdateprofessorRequest
  ): Promise<UpdateprofessorResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/professor/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteprofessor: async (
    deleteData: DeleteprofessoreRequest
  ): Promise<DeleteprofessorResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/professor/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllprofessors: async (
    getData: GetAllprofessorsRequest
  ): Promise<GetAllprofessorsResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/professor/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
