import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootPage from './pages/root';
const SignUp = lazy(() => import('./pages/SignUp/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const ErrorPage = lazy(() => import('./pages/Error/Error'));
const List = lazy(() => import('./pages/Lists/Lists'));
const Login = lazy(() => import('./pages/Login/login'));
const RessetPassword = lazy(
  () => import('./pages/RessetPassword/RessetPassword')
);
const ThemeProviderWrapper = lazy(() => import('./HOC/ThemeWrapper/wrapper'));
const CreateOfficeManager = lazy(
  () => import('./pages/createOfficeManager/CreateOfficeManager')
);
const CreateSchoolManager = lazy(
  () => import('./pages/createSchoolManager/CreateSchoolManager')
);
const CreateSchool = lazy(() => import('./pages/createSchool/CreateSchool'));
const CreateTeacher = lazy(() => import('./pages/createTeacher/CreateTeacher'));
const CreateProfessor = lazy(
  () => import('./pages/createProfessr/CreateProfessor')
);
import AlertWrapper from './HOC/alertWrapper/alertWrapper';
import './index.module.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthenticationHOC from './HOC/authenticationHOC/authentifcationHOC';
const Profile = lazy(() => import('./pages/profile/Profile'));
const UserInfo = lazy(() => import('./pages/UserInfo/UserInfo'));
import Requests from '../src/pages/Requests/Requests';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthenticationHOC>
        <RootPage />
      </AuthenticationHOC>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/resset',
    element: <RessetPassword />,
  },
  {
    path: '/dashboard',
    element: (
      <AuthenticationHOC>
        <Dashboard />
      </AuthenticationHOC>
    ),
  },
  {
    path: '/dashboard/list/:userType',
    element: <List />,
  },
  {
    path: '/dashboard/createOfficeManager',
    element: <CreateOfficeManager />,
  },
  {
    path: '/dashboard/createSchool',
    element: <CreateSchool />,
  },
  {
    path: '/dashboard/createSchoolManager',
    element: <CreateSchoolManager />,
  },
  {
    path: '/dashboard/createProfessor',
    element: <CreateProfessor />,
  },
  {
    path: 'dashboard/profile',
    element: <Profile />,
  },
  {
    path: '/dashboard/:userType/:id',
    element: <UserInfo />,
  },
  {
    path: '/dashboard/requests',
    element: <Requests />,
  },
  {
    path: '/dashboard/createTeacher',
    element: (
      <AuthenticationHOC>
        <CreateTeacher />
      </AuthenticationHOC>
    ),
  },
]);

const rootEl = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertWrapper>
        <Suspense fallback={<h1>Still Loading…</h1>}>
          <ThemeProviderWrapper>
            <RouterProvider router={router} />
          </ThemeProviderWrapper>
        </Suspense>
      </AlertWrapper>
    </Provider>
  </React.StrictMode>
);
