import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { login } from './authSlice';
import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
  ChangePasswordRequest,
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

export const changePasswordAsync = createAsyncThunk(
  'auth/changePasswordAsync',
  async (changePassData: ChangePasswordRequest) => {
    const response = await authApi.changePassword(changePassData);
    return response;
  }
);
