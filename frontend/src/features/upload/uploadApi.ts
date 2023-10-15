import axiosInstance from '../../utils/axios/index';
import { UploadFileRequest, UploadFileResponse } from './interface/index';
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL

export const fileApi = {
  uploadFile: async (
    getData: UploadFileRequest
  ): Promise<UploadFileResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/accounts/api/v1/avatar/upload/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
