import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Home from "../MainLayout/Home/Home";
import MainLayout from "../MainLayout/MainLayout/MainLayout";
import Login from "../MainLayout/Auth/Login";
import Register from "../MainLayout/Auth/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" Component={MainLayout}>
      <Route index={true} Component={Home} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>,
  ])
);

export default router;
