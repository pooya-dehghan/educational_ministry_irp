import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, LoginRequest, LoginResponse } from './authApi';
import { login } from './authSlice';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (loginData: LoginRequest) => {
    const response = await authApi.login(loginData);
    return response;
  }
);
