// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { signup } = signUpSlice.actions;

export default signUpSlice.reducer;
