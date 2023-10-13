import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  professorinfo: {
    username: '',
    avatar: '',
    status: '',
  },
  allProfessors: [],
};

const professorSlice = createSlice({
  name: 'professor',
  initialState,
  reducers: {
    createProfessor: (state, action) => {
      state.professorinfo = action.payload;
    },
    getAllProfessors: (state, action) => {
      state.allProfessors = action.payload;
    },
    deleteProfessorById: (state, action) => {
      state.allProfessors = state.allProfessors.filter(
        (professor: any) => professor.id != action.payload
      );
    },
    updateProfessor: (state, action) => {
      state.professorinfo = action.payload;
    },
    deleteProfessor: (state, action) => {
      state.professorinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createProfessor,
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
  deleteProfessorById,
} = professorSlice.actions;

export default professorSlice.reducer;
