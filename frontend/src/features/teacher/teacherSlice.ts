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
    createteacher: (state, action) => {
      state.teacherinfo = action.payload;
    },
    getAllteachers: (state, action) => {
      state.allteachers = action.payload;
    },
    updateteacher: (state, action) => {
      state.teacherinfo = action.payload;
    },
    deleteteacher: (state, action) => {
      state.teacherinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createteacher,
  getAllteachers,
  updateteacher,
  deleteteacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;
