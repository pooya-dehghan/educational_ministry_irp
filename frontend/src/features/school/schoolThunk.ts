import { createAsyncThunk } from '@reduxjs/toolkit';
import { schoolApi } from './schoolApi';
import {
  GetAllSchoolsRequest,
  GetAllSchoolsResponse,
} from './interface/interface.index';

export const getSchoolsAsync = createAsyncThunk(
  'school/getall',
  async (getData: GetAllSchoolsRequest) => {
    const response = await schoolApi.getAllSchools(getData);
    return response;
  }
);
