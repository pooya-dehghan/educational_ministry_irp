import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from './dashboardApi';

export const dashboardAsync = createAsyncThunk('dashboard/info', async () => {
  const response = await dashboardApi.getDashboard();
  return response;
});
