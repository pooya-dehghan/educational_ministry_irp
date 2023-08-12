import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  professor: {
    name: '',
    university: '',
  },
  professors: [],
};

const professorSlice = createSlice({
  name: 'professor',
  initialState,
  reducers: {
    getAllProfessors: (state, action) => {
      state.professor = action.payload;
    },
  },
});

export const { getAllProfessors } = professorSlice.actions;

export default professorSlice.reducer;
