import { createAsyncThunk } from '@reduxjs/toolkit';
import { teacherApi } from './teacherApi';
import {
  createteacher,
  updateteacher,
  deleteteacher,
  getAllteachers,
} from './teacherSlice';

import {
  CreateteacherRequest,
  DeleteteachereRequest,
  GetAllteachersRequest,
  GetteacherRequest,
  UpdateteacherRequest,
} from './interface/interface.index';

export const createTeacherAsync = createAsyncThunk(
  'teacher/create',
  async (createData: CreateteacherRequest) => {
    const response = await teacherApi.createteacher(createData);
    return response;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  'teacher/create',
  async (updateData: UpdateteacherRequest) => {
    const response = await teacherApi.updateteacher(updateData);
    return response;
  }
);

export const getTeacherAsync = createAsyncThunk(
  'teacher/get',
  async (getData: GetteacherRequest) => {
    const response = await teacherApi.getteacher(getData);
    return response;
  }
);

export const getAllTeachersAsync = createAsyncThunk(
  'teacher/getall',
  async (getData: GetAllteachersRequest) => {
    const response = await teacherApi.getAllteachers(getData);
    return response;
  }
);

export const deleteTeachersAsync = createAsyncThunk(
  'teacher/delete',
  async (deleteData: DeleteteachereRequest) => {
    const response = await teacherApi.deleteteacher(deleteData);
    return response;
  }
);
