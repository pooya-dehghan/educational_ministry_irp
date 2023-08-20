import axios from 'axios';
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
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const professorApi = {
  getAllProfessors: async (
    getData: GetAllProfessorsRequest
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
  createProfessor: async (
    createData: CreateProfessorRequest
  ): Promise<CreateProfessorResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/professor/api/v1/list/`,
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
      const response = await axios.get(
        `${API_BASE_URL}/professor/api/v1/list/`,
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
      const response = await axios.get(
        `${API_BASE_URL}/professor/api/v1/list/`,
        getData
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
      const response = await axios.get(
        `${API_BASE_URL}/professor/api/v1/list/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
