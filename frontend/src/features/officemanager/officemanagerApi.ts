import axsioInstance from '../../utils/axios/index';
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
      const response = await axsioInstance.get(
        `${API_BASE_URL}/officemanager/api/v1/get/${getData.officemanagerID}/`
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
      const response = await axsioInstance.post(
        `${API_BASE_URL}/officemanager/api/v1/create/`,
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
      const response = await axsioInstance.put(
        `${API_BASE_URL}/officemanager/api/v1/update/${updateData.id}/`,
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
      const response = await axsioInstance.delete(
        `${API_BASE_URL}/officemanager/api/v1/delete/${deleteData.id}`
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
      const response = await axsioInstance.get(
        `${API_BASE_URL}/officemanager/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
