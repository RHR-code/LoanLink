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
import ApprovedLoans from "../DashboardLayout/ManagerPages/ApprovedLoans";
import ManagerProfile from "../DashboardLayout/AdminPages/ManagerProfile";
import ManagerRoute from "./ManagerRoute";
import MyLoans from "../DashboardLayout/UserPages/MyLoans";
import PaymentSuccess from "../DashboardLayout/Payment/PaymentSuccess";
import MyProfile from "../DashboardLayout/UserPages/MyProfile";

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
      <Route
        path="/dashboard/add-loan"
        element={
          <ManagerRoute>
            <AddLoan />
          </ManagerRoute>
        }
      />
      <Route
        path="/dashboard/manage-loans"
        element={
          <ManagerRoute>
            <ManageLoans />
          </ManagerRoute>
        }
      />
      <Route
        path="/dashboard/pending-loans"
        element={
          <ManagerRoute>
            <PendingLoans />
          </ManagerRoute>
        }
      />
      <Route
        path="/dashboard/approved-loans"
        element={
          <ManagerRoute>
            <ApprovedLoans />
          </ManagerRoute>
        }
      />
      <Route
        path="/dashboard/manager-profile"
        element={
          <ManagerRoute>
            <ManagerProfile />
          </ManagerRoute>
        }
      />
      {/* Routes For Users */}
      <Route path="/dashboard/my-loans" element={<MyLoans />} />
      <Route path="/dashboard/my-profile" element={<MyProfile />} />

      {/* success and cancel */}
      <Route path="/dashboard/payment-success" Component={PaymentSuccess} />
    </Route>,
  ])
);

export default router;
