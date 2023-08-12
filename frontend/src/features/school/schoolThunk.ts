import { createAsyncThunk } from '@reduxjs/toolkit';
import { schoolApi } from './schoolApi';
import {
  createschool,
  updateschool,
  deleteschool,
  getAllschools,
} from './schoolSlice';

import {
  CreateschoolRequest,
  DeleteschooleRequest,
  GetAllschoolsRequest,
  GetschoolRequest,
  UpdateschoolRequest,
} from './interface/interface.index';

export const createschoolAsync = createAsyncThunk(
  'school/create',
  async (createData: CreateschoolRequest) => {
    const response = await schoolApi.createschool(createData);
    return response;
  }
);

export const updateschoolAsync = createAsyncThunk(
  'school/create',
  async (updateData: UpdateschoolRequest) => {
    const response = await schoolApi.updateschool(updateData);
    return response;
  }
);

export const getschoolAsync = createAsyncThunk(
  'school/get',
  async (getData: GetschoolRequest) => {
    const response = await schoolApi.getschool(getData);
    return response;
  }
);

export const getAllschoolsAsync = createAsyncThunk(
  'school/getall',
  async (getData: GetAllschoolsRequest) => {
    const response = await schoolApi.getAllschools(getData);
    return response;
  }
);

export const deleteschoolsAsync = createAsyncThunk(
  'school/delete',
  async (deleteData: DeleteschooleRequest) => {
    const response = await schoolApi.deleteschool(deleteData);
    return response;
  }
);
