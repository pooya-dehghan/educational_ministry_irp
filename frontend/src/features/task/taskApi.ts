import axiosInstance from '../../utils/axios/index';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  UploadTaskRequest,
  UploadTaskResponse,
} from './interface/interface.index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const taskApi = {
  createTask: async (
    getData: CreateTaskRequest
  ): Promise<CreateTaskResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/task/api/v1/create/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadTask: async (upload: any): Promise<UploadTaskResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/task/api/v1/upload/${upload.get('task_id')}/`,
        upload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStudentsTasks: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/task/api/v1/list/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
