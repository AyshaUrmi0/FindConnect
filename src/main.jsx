import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../src/router/Router";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/Authcontext/AuthProvider";
import "./App.css";
import ThemeProvider from "./context/Authcontext/ThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
   <ThemeProvider>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
   </ThemeProvider>
  </React.StrictMode>
);

