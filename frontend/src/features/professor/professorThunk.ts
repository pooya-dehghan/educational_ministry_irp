import { createAsyncThunk } from '@reduxjs/toolkit';
import { professorApi } from './professorApi';
import {
  createprofessor,
  updateprofessor,
  deleteprofessor,
  getAllprofessors,
} from './professorSlice';

import {
  CreateprofessorRequest,
  DeleteprofessoreRequest,
  GetAllprofessorsRequest,
  GetprofessorRequest,
  UpdateprofessorRequest,
} from './interface/interface.index';

export const createprofessorAsync = createAsyncThunk(
  'professor/create',
  async (createData: CreateprofessorRequest) => {
    const response = await professorApi.createprofessor(createData);
    return response;
  }
);

export const updateprofessorAsync = createAsyncThunk(
  'professor/create',
  async (updateData: UpdateprofessorRequest) => {
    const response = await professorApi.updateprofessor(updateData);
    return response;
  }
);

export const getprofessorAsync = createAsyncThunk(
  'professor/get',
  async (getData: GetprofessorRequest) => {
    const response = await professorApi.getprofessor(getData);
    return response;
  }
);

export const getAllprofessorsAsync = createAsyncThunk(
  'professor/getall',
  async (getData: GetAllprofessorsRequest) => {
    const response = await professorApi.getAllprofessors(getData);
    return response;
  }
);

export const deleteprofessorsAsync = createAsyncThunk(
  'professor/delete',
  async (deleteData: DeleteprofessoreRequest) => {
    const response = await professorApi.deleteprofessor(deleteData);
    return response;
  }
);
