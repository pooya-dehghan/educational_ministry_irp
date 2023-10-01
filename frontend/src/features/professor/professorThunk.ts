import { createAsyncThunk } from '@reduxjs/toolkit';
import { professorApi } from './professorApi';
import {
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getAllProfessors,
} from './professorSlice';

import {
  CreateProfessorRequest,
  DeleteProfessorRequest,
  GetAllProfessorsRequest,
  GetProfessorRequest,
  UpdateProfessorRequest,
} from './interface/interface.index';

export const createProfessorAsync = createAsyncThunk(
  'professor/create',
  async (createData: CreateProfessorRequest) => {
    const response = await professorApi.createProfessor(createData);
    return response;
  }
);

export const updateProfessorAsync = createAsyncThunk(
  'professor/create',
  async (updateData: UpdateProfessorRequest) => {
    const response = await professorApi.updateProfessor(updateData);
    return response;
  }
);

export const getProfessorAsync = createAsyncThunk(
  'professor/get',
  async (getData: GetProfessorRequest) => {
    const response = await professorApi.getProfessor(getData);
    return response;
  }
);

export const getAllProfessorsAsync = createAsyncThunk(
  'professor/getall',
  async () => {
    const response = await professorApi.getAllProfessors();
    return response;
  }
);

export const deleteProfessorsAsync = createAsyncThunk(
  'professor/delete',
  async (deleteData: DeleteProfessorRequest) => {
    const response = await professorApi.deleteProfessor(deleteData);
    return response;
  }
);
