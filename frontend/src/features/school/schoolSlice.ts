import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  school: {
    name: '',
    region: '',
  },
  schools: [],
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    getAllSchools: (state, action) => {
      state.schools = action.payload;
    },
  },
});

export const { getAllSchools } = schoolSlice.actions;

export default schoolSlice.reducer;
