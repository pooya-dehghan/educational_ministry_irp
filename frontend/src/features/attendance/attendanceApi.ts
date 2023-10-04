import axiosInstance from '../../utils/axios/index';
import {
  GetAttendancesOfStudentRequest,
  GetAttendancesOfStudentResponse,
  CreateAttendanceStudentRequest,
  CreateAttendanceStudentResponse,
} from './interface/interface';

const API_BASE_URL = 'http://localhost:8000'; // Your API base URL

export const attendanceApi = {
  getAttendances: async (
    data: GetAttendancesOfStudentRequest
  ): Promise<GetAttendancesOfStudentResponse> => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/attendance/api/v1/get/${data.id}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAttendance: async (
    data: CreateAttendanceStudentRequest
  ): Promise<CreateAttendanceStudentResponse> => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/attendance/api/v1/fill/${data.id}/`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
