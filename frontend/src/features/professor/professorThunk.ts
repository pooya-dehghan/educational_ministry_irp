import { createAsyncThunk } from '@reduxjs/toolkit';
import { professorApi } from './professorApi';
import {
  GetAllProfessorRequest,
  GetAllProfessorResponse,
} from './interface/interface.index';

export const getProfessorsAsync = createAsyncThunk(
  'school/getall',
  async (getData: GetAllProfessorRequest) => {
    const response = await professorApi.getAllSchools(getData);
    return response;
  }
);
