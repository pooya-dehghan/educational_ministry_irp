import { createAsyncThunk } from '@reduxjs/toolkit';
import { attendanceApi } from './attendanceAPI';
import {
  CreateAttendanceStudentRequest,
  GetAttendancesOfStudentRequest,
} from './interface/interface';

export const getAttendanceStudentAsync = createAsyncThunk(
  'attendance/get',
  async (data: GetAttendancesOfStudentRequest) => {
    const response = await attendanceApi.getAttendances(data);
    return response;
  }
);

export const createAttendanceStudentAsync = createAsyncThunk(
  'attendance/get',
  async (data: CreateAttendanceStudentRequest) => {
    const response = await attendanceApi.createAttendance(data);
    return response;
  }
);
