import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootPage from './pages/root';
import SignUp from './pages/SignUp/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/Error/Error';
import List from './pages/Lists/Lists';
import Login from './pages/Login/login';
import ThemeProviderWrapper from './wrapper';
import AlertWrapper from './HOC/alertWrapper/alertWrapper';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
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
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/list/schools',
    element: <List />,
  },
  {
    path: '/dashboard/list/managers',
    element: <List />,
  },
  {
    path: '/dashboard/list/principals',
    element: <List />,
  },
]);

const rootEl = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertWrapper>
        <ThemeProviderWrapper>
          <RouterProvider router={router} />
        </ThemeProviderWrapper>
      </AlertWrapper>
    </Provider>
  </React.StrictMode>
);
