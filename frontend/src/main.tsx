import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootPage from "./pages/root";
import SignUp from "./pages/SignUp/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/Error/Error";
import List from "./pages/Lists/Lists";
import Login from "./pages/Login/login";
import ThemeProviderWrapper from "./HOC/ThemeWrapper/wrapper";
import CreateOfficeManager from "./pages/createOfficeManager/CreateOfficeManager";
import CreateSchoolManager from "./pages/createSchoolManager/CreateSchoolManager";
import CreateSchool from "./pages/createSchool/CreateSchool";
import CreateTeacher from "./pages/createTeacher/CreateTeacher";
import CreateProfessor from "./pages/createProfessr/CreateProfessor";
import AlertWrapper from "./HOC/alertWrapper/alertWrapper";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthenticationHOC from "./HOC/authenticationHOC/authentifcationHOC";
import Profile from "./pages/profile/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticationHOC>
        <RootPage />
      </AuthenticationHOC>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthenticationHOC>
        <Dashboard />
      </AuthenticationHOC>
    ),
  },
  {
    path: "/dashboard/list/schools",
    element: <List />,
  },
  {
    path: "/dashboard/list/managers",
    element: <List />,
  },
  {
    path: "/dashboard/list/principals",
    element: <List />,
  },
  {
    path: "/dashboard/createOfficeManager",
    element: <CreateOfficeManager />,
  },
  {
    path: "/dashboard/createSchool",
    element: <CreateSchool />,
  },
  {
    path: "/dashboard/createSchoolManager",
    element: <CreateSchoolManager />,
  },
  {
    path: "/dashboard/createProfessor",
    element: <CreateProfessor />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/createTeacher",
    element: (
      <AuthenticationHOC>
        <CreateTeacher />
      </AuthenticationHOC>
    ),
  },
]);

const rootEl = document.getElementById("root") as HTMLElement;
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
