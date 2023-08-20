import axios from "axios";
import axsioInstance from "../../utils/axios/index";
import {
  CreateSchoolManagerRequest,
  CreateSchoolManagerResponse,
  DeleteSchoolManagereRequest,
  DeleteSchoolManagerResponse,
  GetAllSchoolManagersRequest,
  GetAllSchoolManagersResponse,
  GetSchoolManagerRequest,
  GetSchoolManagerResponse,
  UpdateSchoolManagerRequest,
  UpdateSchoolManagerResponse,
} from "./interface/interface.index";
const API_BASE_URL = "http://localhost:8000"; // Your API base URL

export const schoolManagerApi = {
  getSchoolManager: async (
    getData: GetSchoolManagerRequest
  ): Promise<GetSchoolManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/schoolmanager/api/v1/SchoolManager/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSchoolManager: async (
    createData: CreateSchoolManagerRequest
  ): Promise<CreateSchoolManagerResponse> => {
    try {
      const response = await axsioInstance.post(
        `${API_BASE_URL}/schoolmanager/api/v1/create/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSchoolManager: async (
    updateData: UpdateSchoolManagerRequest
  ): Promise<UpdateSchoolManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/schoolmanager/api/v1/SchoolManager/`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSchoolManager: async (
    deleteData: DeleteSchoolManagereRequest
  ): Promise<DeleteSchoolManagerResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/schoolmanager/api/v1/SchoolManager/`,
        deleteData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllSchoolManagers: async (
    getData: GetAllSchoolManagersRequest
  ): Promise<GetAllSchoolManagersResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/schoolmanager/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
