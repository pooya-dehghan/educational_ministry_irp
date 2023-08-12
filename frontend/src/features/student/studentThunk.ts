import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentApi } from './studentApi';
import {
  GetAllStudentsRequest,
  GetAllStudentsResponse,
} from './interface/interface.index';

export const getStudentsAsync = createAsyncThunk(
  'school/getall',
  async (getData: GetAllStudentsRequest) => {
    const response = await studentApi.getAllSchools(getData);
    return response;
  }
);
