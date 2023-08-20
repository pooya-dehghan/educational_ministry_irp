import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teacherinfo: {
    username: '',
    avatar: '',
    status: '',
  },
  allteachers: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    createTeacher: (state, action) => {
      state.teacherinfo = action.payload;
    },
    getAllTeachers: (state, action) => {
      state.allteachers = action.payload;
    },
    updateTeacher: (state, action) => {
      state.teacherinfo = action.payload;
    },
    deleteTeacher: (state, action) => {
      state.teacherinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;
