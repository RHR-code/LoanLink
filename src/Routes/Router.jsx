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
import AllLoans from "../MainLayout/Pages/AllLoans";
import LoanDetails from "../MainLayout/Pages/LoanDetails";
import ApplyForLoan from "../MainLayout/Pages/ApplyForLoan";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" Component={MainLayout}>
      <Route index={true} Component={Home} />
      <Route path="/all-loans" Component={AllLoans} />
      <Route
        path="/all-loans/:id"
        element={
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        }
      />
      <Route path="/apply-loan" element={<ApplyForLoan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>,
  ])
);

export default router;
