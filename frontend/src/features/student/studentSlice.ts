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
} = studentSlice.actions;

export default studentSlice.reducer;
