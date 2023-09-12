import { createAsyncThunk } from '@reduxjs/toolkit';
import { officeManagerApi } from './officemanagerApi';
import {
  createOfficeManager,
  updateOfficeManager,
  deleteOfficeManager,
  getAllOfficeManagers,
} from './officemanagerSlice';
import {
  CreateOfficeManagerRequest,
  DeleteOfficeManagereRequest,
  GetAllOfficeManagersRequest,
  GetOfficeManagerRequest,
  UpdateOfficeManagerRequest,
} from './interface/interface.index';

export const createOfficeManagerAsync = createAsyncThunk(
  'officemanager/create',
  async (createData: CreateOfficeManagerRequest) => {
    const response = await officeManagerApi.createOfficeManager(createData);
    //method
    return response;
  }
);

export const updateOfficeManagerAsync = createAsyncThunk(
  'officemanager/create',
  async (updateData: UpdateOfficeManagerRequest) => {
    const response = await officeManagerApi.updateOfficeManager(updateData);
    return response;
  }
);

export const getOfficeManagerAsync = createAsyncThunk(
  'officemanager/get',
  async (getData: GetOfficeManagerRequest) => {
    const response = await officeManagerApi.getOfficeManager(getData);
    return response;
  }
);

export const getAllOfficeManagersAsync = createAsyncThunk(
  'officemanager/getall',
  async (getData: GetAllOfficeManagersRequest) => {
    const response = await officeManagerApi.getAllOfficeManagers(getData);
    return response;
  }
);

export const deleteOfficeManagersAsync = createAsyncThunk(
  'officemanager/delete',
  async (deleteData: DeleteOfficeManagereRequest) => {
    const response = await officeManagerApi.deleteOfficeManager(deleteData);
    return response;
  }
);
