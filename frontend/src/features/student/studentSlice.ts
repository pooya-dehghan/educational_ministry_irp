import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentinfo: {
    username: '',
    avatar: '',
    status: '',
  },
  allstudents: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    createstudent: (state, action) => {
      state.studentinfo = action.payload;
    },
    getAllstudents: (state, action) => {
      state.allstudents = action.payload;
    },
    deleteStudentById: (state, action) => {
      state.allstudents = state.allstudents.filter(
        (student: any) => student.id != action.payload
      );
    },
    updatestudent: (state, action) => {
      state.studentinfo = action.payload;
    },
    deletestudent: (state, action) => {
      state.studentinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createstudent,
  getAllstudents,
  updatestudent,
  deletestudent,
  deleteStudentById,
} = studentSlice.actions;

export default studentSlice.reducer;
