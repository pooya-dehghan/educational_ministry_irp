import axiosInstance from '../../utils/axios/index';
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL
import * as IRequest from './interface/interface.index';

export const ProfessorRequestApi = {
  getAllProfessorRequests: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/professorrequest/api/v1/list/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptProfessorRequests: async (
    acceptRequest: IRequest.AcceptProfessorRequestRequest
  ) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/professorrequest/api/v1/accept/${acceptRequest.id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectProfessorRequests: async (
    rejectRequest: IRequest.RejectProfessorRequestRequest
  ) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/professorrequest/api/v1/reject/${rejectRequest.id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
