import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from './taskApi';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTaskRequest,
  GetTaskResponse,
  UploadTaskRequest,
} from './interface/interface.index';

export const createTaskAsync = createAsyncThunk(
  'task/create',
  async (createData: CreateTaskRequest) => {
    const response = await taskApi.createTask(createData);
    return response;
  }
);

export const uploadTaskAsync = createAsyncThunk(
  'task/upload',
  async (upload: any) => {
    const response = await taskApi.uploadTask(upload);
    return response;
  }
);

export const getStudentsTasksAsync = createAsyncThunk('task/get', async () => {
  const response = await taskApi.getStudentsTasks();
  return response;
});
