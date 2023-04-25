import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./routes/home";
import Login from "./routes/login";
import ErrorPage from "./error-page";

import User from "./routes/user"


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
    element: <User></User>
  }
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);