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
import AdminRoute from "./AdminRoute";
import AddLoan from "../DashboardLayout/ManagerPages/AddLoan";
import ManageLoans from "../DashboardLayout/ManagerPages/ManageLoans";
import PendingLoans from "../DashboardLayout/ManagerPages/PendingLoans";

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
      {/* Routes For Admin */}
      <Route
        path="/dashboard/all-loan"
        element={
          <AdminRoute>
            <AllLoansDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard/manage-users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard/loan-applications"
        element={
          <AdminRoute>
            <LoanApplications />
          </AdminRoute>
        }
      />
      {/* Routes For Manager */}
      <Route path="/dashboard/add-loan" element={<AddLoan />} />
      <Route path="/dashboard/manage-loans" element={<ManageLoans />} />
      <Route path="/dashboard/pending-loans" element={<PendingLoans />} />
    </Route>,
  ])
);

export default router;
