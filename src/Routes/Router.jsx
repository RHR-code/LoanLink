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
import DashboardLayout from "../DashboardLayout/DashboardLayout/DashboardLayout";
import ManageUsers from "../DashboardLayout/AdminPages/ManageUsers";
import AllLoansDashboard from "../DashboardLayout/AdminPages/AllLoansDashboard";
import LoanApplications from "../DashboardLayout/AdminPages/LoanApplications";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" Component={MainLayout}>
      <Route index={true} Component={Home} />
      <Route path="/all-loans" Component={AllLoans} />
      <Route
        path="/loan-details/:id"
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
    // Dashboard Routes
    <Route path="/dashboard" Component={DashboardLayout}>
      <Route path="/dashboard/all-loan" Component={AllLoansDashboard} />
      <Route path="/dashboard/manage-users" Component={ManageUsers} />
      <Route path="/dashboard/loan-applications" Component={LoanApplications} />
    </Route>,
  ])
);

export default router;
