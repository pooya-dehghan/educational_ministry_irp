import { createSlice } from '@reduxjs/toolkit';
interface responseStateType {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  open: boolean;
}
const initialState: responseStateType = {
  message: '',
  severity: 'success',
  open: false,
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    updateResponse: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = action.payload.open;
    },
  },
});

export const { updateResponse } = responseSlice.actions;

export default responseSlice.reducer;
