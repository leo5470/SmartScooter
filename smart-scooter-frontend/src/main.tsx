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

import Search from "./routes/user/search";

import Settings from "./component/settings";
import Rent from "./component/rent";
import Recharge from "./component/recharge";

import "./asset/css/pico.min.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "login", element: <Login></Login> },
      { path: "signup", element: <Signup></Signup> }
    ]
  },
  {
    path: "/user",
    element: <User></User>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "settings", element: <Settings></Settings> },
      { path: "rent", element: <Rent></Rent> },
      { path: "search", element: <Search></Search> },
      { path: "recharge", element: <Recharge></Recharge> }
    ]
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
    children: [
      { path: "settings", element: <Settings></Settings> }
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
  </React.StrictMode>
);