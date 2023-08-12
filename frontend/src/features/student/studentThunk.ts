import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentApi } from './studentApi';
import {
  createstudent,
  updatestudent,
  deletestudent,
  getAllstudents,
} from './studentSlice';

import {
  CreatestudentRequest,
  DeletestudenteRequest,
  GetAllstudentsRequest,
  GetstudentRequest,
  UpdatestudentRequest,
} from './interface/interface.index';

export const createstudentAsync = createAsyncThunk(
  'student/create',
  async (createData: CreatestudentRequest) => {
    const response = await studentApi.createstudent(createData);
    return response;
  }
);

export const updatestudentAsync = createAsyncThunk(
  'student/create',
  async (updateData: UpdatestudentRequest) => {
    const response = await studentApi.updatestudent(updateData);
    return response;
  }
);

export const getstudentAsync = createAsyncThunk(
  'student/get',
  async (getData: GetstudentRequest) => {
    const response = await studentApi.getstudent(getData);
    return response;
  }
);

export const getAllstudentsAsync = createAsyncThunk(
  'student/getall',
  async (getData: GetAllstudentsRequest) => {
    const response = await studentApi.getAllstudents(getData);
    return response;
  }
);

export const deletestudentsAsync = createAsyncThunk(
  'student/delete',
  async (deleteData: DeletestudenteRequest) => {
    const response = await studentApi.deletestudent(deleteData);
    return response;
  }
);
