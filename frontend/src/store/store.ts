// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import signUpReducer from '../features/signup/signUpSlice';
import responseReducer from '../features/response/responseSlice';
import officeManagerReducer from '../features/officemanager/officemanagerSlice';
import professorReducer from '../features/professor/professorSlice';
import schoolReducer from '../features/school/schoolSlice';
import teacherReducer from '../features/teacher/teacherSlice';
import studentReducer from '../features/student/studentSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signUpReducer,
    response: responseReducer,
    officeManager: officeManagerReducer,
    professor: professorReducer,
    school: schoolReducer,
    teacher: teacherReducer,
    student: studentReducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
