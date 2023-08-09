// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import signUpReducer from '../features/signup/signUpSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signUpReducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
