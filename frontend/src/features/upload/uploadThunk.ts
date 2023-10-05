import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadFileRequest, UploadFileResponse } from './interface/index';
import { fileApi } from './uploadApi';

export const uploadFileAsync = createAsyncThunk(
  'upload',
  async (file: UploadFileRequest) => {
    const response = await fileApi.uploadFile(file);
    return response;
  }
);
