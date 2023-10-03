import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationApi } from './notificationApi';
import { SeenNotificationRequest, GetAllNotificationRequest } from './interface/interface.index';

export const getAllNotificationsAsync = createAsyncThunk(
  'notification/create',
  async (notifData : GetAllNotificationRequest) => {
    const response = await NotificationApi.getAllNotification(notifData);
    //method
    return response;
  }
);

export const seenNotificationAsync = createAsyncThunk(
  'notification/seen',
  async (data: SeenNotificationRequest) => {
    const response = await NotificationApi.seenNotification(data);
    return response;
  }
);
