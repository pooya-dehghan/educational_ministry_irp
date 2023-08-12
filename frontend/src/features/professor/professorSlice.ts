import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  professorinfo: {
    username: '',
    avatar: '',
    status: '',
  },
  allprofessors: [],
};

const professorSlice = createSlice({
  name: 'professor',
  initialState,
  reducers: {
    createprofessor: (state, action) => {
      state.professorinfo = action.payload;
    },
    getAllprofessors: (state, action) => {
      state.allprofessors = action.payload;
    },
    updateprofessor: (state, action) => {
      state.professorinfo = action.payload;
    },
    deleteprofessor: (state, action) => {
      state.professorinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createprofessor,
  getAllprofessors,
  updateprofessor,
  deleteprofessor,
} = professorSlice.actions;

export default professorSlice.reducer;
