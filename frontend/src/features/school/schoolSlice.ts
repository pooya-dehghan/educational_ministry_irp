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
    createschool: (state, action) => {
      state.schoolinfo = action.payload;
    },
    getAllschools: (state, action) => {
      state.allschools = action.payload;
    },
    updateschool: (state, action) => {
      state.schoolinfo = action.payload;
    },
    deleteschool: (state, action) => {
      state.schoolinfo = { schoolname : ''};
    },
  },
});

export const {
  createschool,
  getAllschools,
  updateschool,
  deleteschool,
} = schoolSlice.actions;

export default schoolSlice.reducer;
