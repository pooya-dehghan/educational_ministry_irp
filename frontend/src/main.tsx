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
import ThemeProviderWrapper from './wrapper';
import './index.css';
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
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const rootEl = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </React.StrictMode>
);
