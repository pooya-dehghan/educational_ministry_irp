import axiosInstance from '../../utils/axios/index';
import {
  CreateProfessorRequest,
  CreateProfessorResponse,
  DeleteProfessorRequest,
  DeleteProfessorResponse,
  GetAllProfessorsRequest,
  GetAllProfessorResponse,
  GetProfessorRequest,
  GetProfessorResponse,
  UpdateProfessorRequest,
  UpdateProfessorResponse,
} from './interface/interface.index';
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL

export const professorApi = {
  getAllProfessors: async (): Promise<GetAllProfessorResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/professor/api/v1/list/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createProfessor: async (
    createData: CreateProfessorRequest
  ): Promise<CreateProfessorResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/professor/api/v1/create/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfessor: async (
    updateData: UpdateProfessorRequest
  ): Promise<UpdateProfessorResponse> => {
    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/professor/api/v1/update/${updateData.id}/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProfessor: async (
    getData: GetProfessorRequest
  ): Promise<GetProfessorResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/professor/api/v1/get/${getData.professorId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteProfessor: async (
    deleteData: DeleteProfessorRequest
  ): Promise<DeleteProfessorResponse> => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/professor/api/v1/delete/${deleteData.id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
