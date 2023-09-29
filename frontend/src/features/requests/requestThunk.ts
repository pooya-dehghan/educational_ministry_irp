import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestApi } from './requestApi';
import {
  AcceptRequestRequest,
  RejectRequestRequest,
  SendRequestRequest,
} from './interface/interface.index';

export const getAllRequestsAsync = createAsyncThunk('request/all', async () => {
  const response = await RequestApi.getAllRequests({});
  //method
  return response;
});

export const acceptRequestAsync = createAsyncThunk(
  'request/accept',
  async (data: AcceptRequestRequest) => {
    const response = await RequestApi.acceptRequest(data);
    return response;
  }
);

export const rejectRequestAsync = createAsyncThunk(
  'request/reject',
  async (data: RejectRequestRequest) => {
    const response = await RequestApi.rejectRequest(data);
    return response;
  }
);

export const sendRequestAsync = createAsyncThunk(
  'request/send',
  async (data: SendRequestRequest) => {
    const response = await RequestApi.sendRequest(data);
    return response;
  }
);
