import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  sideBarList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboardInfo: (state, action) => {
      state.info = action.payload.info;
      state.sideBarList = action.payload.dashboard;
    },
  },
});

export const { getDashboardInfo } = dashboardSlice.actions;

export default dashboardSlice.reducer;
