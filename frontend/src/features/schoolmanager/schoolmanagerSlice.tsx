import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schoolManagerinfo: {
    username: "",
    avatar: "",
    status: "",
  },
  allSchoolManagers: [],
};

const schoolManagerSlice = createSlice({
  name: "schoolmanager",
  initialState,
  reducers: {
    createSchoolManager: (state, action) => {
      state.schoolManagerinfo = action.payload;
    },
    getAllSchoolManagers: (state, action) => {
      state.allSchoolManagers = action.payload;
    },
    updateSchoolManager: (state, action) => {
      state.schoolManagerinfo = action.payload;
    },
    deleteSchoolManager: (state, action) => {
      state.schoolManagerinfo = { username: "", avatar: "", status: "" };
    },
  },
});

export const {
  createSchoolManager,
  getAllSchoolManagers,
  updateSchoolManager,
  deleteSchoolManager,
} = schoolManagerSlice.actions;

export default schoolManagerSlice.reducer;
