import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./main.css";

import Home from "./routes/home";
import Login from "./routes/login";
import ErrorPage from "./error-page";

import User from "./routes/user"
import Admin from "./routes/admin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "login", element: <Login></Login> }
    ]
  },
  {
    path: "/user",
    element: <User></User>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  }
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);