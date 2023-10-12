import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  officeManagerinfo: {
    username: '',
    firstname: '',
    lastname: '',
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
    deleteOfficeManagerById: (state, action) => {
      state.allOfficeManagers = state.allOfficeManagers.filter(
        (officeManager: any) => officeManager.id != action.payload
      );
    },
    updateOfficeManager: (state, action) => {
      state.officeManagerinfo = action.payload;
    },
    deleteOfficeManager: (state, action) => {
      state.officeManagerinfo = {
        username: '',
        avatar: '',
        status: '',
        firstname: '',
        lastname: '',
      };
    },
  },
});

export const {
  createOfficeManager,
  getAllOfficeManagers,
  updateOfficeManager,
  deleteOfficeManager,
  deleteOfficeManagerById,
} = officeManagerSlice.actions;

export default officeManagerSlice.reducer;
