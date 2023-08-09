import { createAsyncThunk } from '@reduxjs/toolkit';
import { signUpApi, SignUpRequest, SignUpResponse } from './signupApi';
import { signup } from './signUpSlice';

export const signUpAsync = createAsyncThunk(
  'signup/signUpAsync',
  async (signUpData: SignUpRequest) => {
    const response = await signUpApi.signup(signUpData);
    return response;
  }
);
