import axiosInstance from '../../utils/axios/index';
const API_BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL
import * as IRequest from './interface/interface.index';

export const NotificationApi = {
  getAllNotification: async (
    getData: IRequest.GetAllNotificationRequest
  ): Promise<IRequest.GetAllNotificationResponse> => {
    let apiNotif = `${API_BASE_URL}/notification/api/v1/list?unseen=1&seen=1`;
    if(getData.unSeen){
      apiNotif = `${API_BASE_URL}/notification/api/v1/list?unseen=1`;
    } 
    try {
      const response = await axiosInstance.get(
        apiNotif
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
