import { createAsyncThunk } from "@reduxjs/toolkit";
import { schoolManagerApi } from "./schoolmanagerApi";
import {
  createSchoolManager,
  updateSchoolManager,
  deleteSchoolManager,
  getAllSchoolManagers,
} from "./schoolmanagerSlice";

import {
  CreateSchoolManagerRequest,
  DeleteSchoolManagereRequest,
  GetAllSchoolManagersRequest,
  GetSchoolManagerRequest,
  UpdateSchoolManagerRequest,
} from "./interface/interface.index";

export const createSchoolManagerAsync = createAsyncThunk(
  "schoolmanager/create",
  async (createData: CreateSchoolManagerRequest) => {
    const response = await schoolManagerApi.createSchoolManager(createData);
    return response;
  }
);

export const updateSchoolManagerAsync = createAsyncThunk(
  "schoolmanager/create",
  async (updateData: UpdateSchoolManagerRequest) => {
    const response = await schoolManagerApi.updateSchoolManager(updateData);
    return response;
  }
);

export const getSchoolManagerAsync = createAsyncThunk(
  "schoolmanager/get",
  async (getData: GetSchoolManagerRequest) => {
    const response = await schoolManagerApi.getSchoolManager(getData);
    return response;
  }
);

export const getAllSchoolManagersAsync = createAsyncThunk(
  "schoolmanager/getall",
  async (getData: GetAllSchoolManagersRequest) => {
    const response = await schoolManagerApi.getAllSchoolManagers(getData);
    return response;
  }
);

export const deleteSchoolManagersAsync = createAsyncThunk(
  "SchoolManager/delete",
  async (deleteData: DeleteSchoolManagereRequest) => {
    const response = await schoolManagerApi.deleteSchoolManager(deleteData);
    return response;
  }
);
