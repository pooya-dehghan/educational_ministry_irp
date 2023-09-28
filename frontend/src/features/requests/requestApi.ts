import axiosInstance from '../../utils/axios/index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL
import * as IRequest from './interface/interface.index';

export const RequestApi = {
  getAllRequests: async (
    getData: IRequest.GetAllRequestsRequest
  ): Promise<IRequest.GetAllRequestsResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/request/api/v1/list/`,
        getData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createRequest: async (
    createData: IRequest.CreateRequestsRequest
  ): Promise<IRequest.CreateRequestsResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/request/api/v1/create/`,
        createData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRequest: async (
    getData: IRequest.GetRequestsRequest
  ): Promise<IRequest.GetRequestsResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/request/api/v1/get/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptRequest: async (
    acceptRequest: IRequest.AcceptRequestRequest
  ): Promise<IRequest.AcceptRequestResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/request/api/v1/accept/${acceptRequest.school_id}/${acceptRequest.request_id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectRequest: async (
    rejectRequest: IRequest.RejectRequestRequest
  ): Promise<IRequest.RejectRequestResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/request/api/v1/reject/${rejectRequest.id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendRequest: async (
    sendData: IRequest.SendRequestRequest
  ): Promise<IRequest.SendRequestResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/request/api/v1/create/${sendData.region}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
