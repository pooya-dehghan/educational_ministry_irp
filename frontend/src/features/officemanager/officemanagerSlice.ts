import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  officeManagerinfo: {
    username: '',
    avatar: '',
    status: '',
  },
  allOfficeManagers: [],
};

const officeManagerSlice = createSlice({
  name: 'officemanager',
  initialState,
  reducers: {
    createOfficeManager: (state, action) => {
      state.officeManagerinfo = action.payload;
    },
    getAllOfficeManagers: (state, action) => {
      state.allOfficeManagers = action.payload;
    },
    updateOfficeManager: (state, action) => {
      state.officeManagerinfo = action.payload;
    },
    deleteOfficeManager: (state, action) => {
      state.officeManagerinfo = { username: '', avatar: '', status: '' };
    },
  },
});

export const {
  createOfficeManager,
  getAllOfficeManagers,
  updateOfficeManager,
  deleteOfficeManager,
} = officeManagerSlice.actions;

export default officeManagerSlice.reducer;
