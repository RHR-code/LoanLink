import React from "react";
import useAuth from "../Hooks/useAuth";
import { useLocation } from "react-router";
import Forbidden from "../components/Forbidden";
import useRole from "../Hooks/useRole";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();

  const { userRole, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loader />;
  }
  if (userRole === "Admin") {
    return children;
  }
  return <Forbidden />;
};

export default AdminRoute;
