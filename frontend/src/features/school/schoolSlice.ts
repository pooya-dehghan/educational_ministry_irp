import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schoolinfo: {
    schoolname : '',
  },
  allschools: [],
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    createSchool: (state, action) => {
      state.schoolinfo = action.payload;
    },
    getAllSchools: (state, action) => {
      state.allschools = action.payload;
    },
    updateSchool: (state, action) => {
      state.schoolinfo = action.payload;
    },
    deleteSchool: (state, action) => {
      state.schoolinfo = { schoolname : ''};
    },
  },
});

export const {
  createSchool,
  getAllSchools,
  updateSchool,
  deleteSchool,
} = schoolSlice.actions;

export default schoolSlice.reducer;
