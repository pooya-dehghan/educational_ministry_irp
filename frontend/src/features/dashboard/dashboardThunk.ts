import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  dashboardApi,
  DashboardRequest,
  DashboardResponse,
} from './dashboardApi';
import { getDashboardInfo } from './dashboardSlice';

export const dashboardAsync = createAsyncThunk(
  'auth/loginAsync',
  async (dashboardData: DashboardRequest) => {
    const response = await dashboardApi.getDashboard(dashboardData);
    return response;
  }
);
