import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Home from "../MainLayout/Home/Home";
import MainLayout from "../MainLayout/MainLayout/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" Component={MainLayout}>
      <Route index={true} Component={Home} />
    </Route>,
  ])
);

export default router;
