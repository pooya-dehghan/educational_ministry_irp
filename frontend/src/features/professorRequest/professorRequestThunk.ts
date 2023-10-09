import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfessorRequestApi } from './professorRequestApi';
import {
  AcceptProfessorRequestRequest,
  AcceptProfessorRequestResponse,
  RejectProfessorRequestRequest,
  RejectProfessorRequestResponse,
} from './interface/interface.index';

export const getAllProfessorRequestsAsync = createAsyncThunk(
  'projessorRequest/all',
  async () => {
    const response = await ProfessorRequestApi.getAllProfessorRequests();
    return response;
  }
);

export const acceptProfessorRequestAsync = createAsyncThunk(
  'request/accept',
  async (data: AcceptProfessorRequestRequest) => {
    const response = await ProfessorRequestApi.acceptProfessorRequests(data);
    return response;
  }
);

export const rejectProfessorRequestAsync = createAsyncThunk(
  'request/reject',
  async (data: RejectProfessorRequestRequest) => {
    const response = await ProfessorRequestApi.rejectProfessorRequests(data);
    return response;
  }
);