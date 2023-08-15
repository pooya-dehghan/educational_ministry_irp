import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { login } from './authSlice';
import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
} from './interface/interface';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (loginData: LoginRequest) => {
    const response = await authApi.login(loginData);
    return response;
  }
);

export const verifyAsync = createAsyncThunk(
  'auth/verifyAsync',
  async (verifyData: VerifyRequest) => {
    const response = await authApi.verify(verifyData);
    return response;
  }
);
