import axios from 'axios';
import {
  CreateOfficeManagerRequest,
  CreateOfficeManagerResponse,
  DeleteOfficeManagereRequest,
  DeleteOfficeManagerResponse,
  GetAllOfficeManagersRequest,
  GetAllOfficeManagersResponse,
  GetOfficeManagerRequest,
  GetOfficeManagerResponse,
  UpdateOfficeManagerRequest,
  UpdateOfficeManagerResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const officeManagerApi = {
  getOfficeManager: async (
    getData: GetOfficeManagerRequest
  ): Promise<GetOfficeManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/officemanager/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createOfficeManager: async (
    createData: CreateOfficeManagerRequest
  ): Promise<CreateOfficeManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/officemanager/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOfficeManager: async (
    updateData: UpdateOfficeManagerRequest
  ): Promise<UpdateOfficeManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/officemanager/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteOfficeManager: async (
    deleteData: DeleteOfficeManagereRequest
  ): Promise<DeleteOfficeManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/api/v1/officemanager/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllOfficeManagers: async (
    getData: GetAllOfficeManagersRequest
  ): Promise<GetAllOfficeManagersResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/officemanager/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
