import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {
    name: '',
    number: '',
  },
  students: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getAllStudents: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { getAllStudents } = studentSlice.actions;

export default studentSlice.reducer;
