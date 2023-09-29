import { createAsyncThunk } from '@reduxjs/toolkit';
import { schoolApi } from './schoolApi';
import {
  createSchool,
  updateSchool,
  deleteSchool,
  getAllSchools,
} from './schoolSlice';

import {
  CreateSchoolRequest,
  DeleteSchooleRequest,
  GetAllSchoolsRequest,
  GetSchoolRequest,
  UpdateSchoolRequest,
} from './interface/interface.index';

export const createSchoolAsync = createAsyncThunk(
  'school/create',
  async (createData: CreateSchoolRequest) => {
    const response = await schoolApi.createschool(createData);
    return response;
  }
);

export const updateSchoolAsync = createAsyncThunk(
  'school/create',
  async (updateData: UpdateSchoolRequest) => {
    const response = await schoolApi.updateschool(updateData);
    return response;
  }
);

export const getSchoolAsync = createAsyncThunk(
  'school/get',
  async (getData: GetSchoolRequest) => {
    const response = await schoolApi.getschool(getData);
    return response;
  }
);

export const getAllSchoolsAsync = createAsyncThunk(
  'school/getall',
  async (getData: GetAllSchoolsRequest) => {
    const response = await schoolApi.getAllschools(getData);
    return response;
  }
);

export const deleteSchoolsAsync = createAsyncThunk(
  'school/delete',
  async (deleteData: DeleteSchooleRequest) => {
    const response = await schoolApi.deleteschool(deleteData);
    return response;
  }
);

export const getAllOfRegionSchoolsAsync = createAsyncThunk(
  'school/getall',
  async () => {
    const response = await schoolApi.getAllOfRegionschools();
    return response;
  }
);
