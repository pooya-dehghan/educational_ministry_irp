import axiosInstance from '../../utils/axios/index';
const API_BASE_URL = 'http://localhost:8000'; // Your API base URL
import * as IRequest from './interface/interface.index';

export const NotificationApi = {
  getAllNotification: async (
    getData: IRequest.GetAllNotificationRequest
  ): Promise<IRequest.GetAllNotificationResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/notification/api/v1/list?unseen=1`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  seenNotification: async (
    data: IRequest.SeenNotificationRequest
  ): Promise<IRequest.SeenNotificationResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/notification/api/v1/seen/${data.id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
