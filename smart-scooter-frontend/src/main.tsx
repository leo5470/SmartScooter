import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./main.css";

import Home from "./routes/home";
import Login from "./routes/login";
import Signup from "./routes/signup";
import ErrorPage from "./error-page";

import User from "./routes/user"
import Admin from "./routes/admin";

import UserMap from "./routes/user/map";
import AdminMap from "./routes/admin/map";

import Settings from "./component/settings";

import "./asset/css/pico.min.css"
import Logout from "./routes/logout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "login", element: <Login></Login> },
      { path: "signup", element: <Signup></Signup> },
      { path: "logout", element: <Logout></Logout> },
    ]
  },
  {
    path: "/user",
    element: <User></User>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "settings", element: <Settings></Settings> },
      { path: "map", element: <UserMap></UserMap> },
    ]
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
    children: [
      { path: "settings", element: <Settings></Settings> },
      { path: "map", element: <AdminMap></AdminMap> }
    ]
  },
  {
    path: "/error",
    element: <ErrorPage></ErrorPage>
  }
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);