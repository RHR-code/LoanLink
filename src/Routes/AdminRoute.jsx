import React from "react";
import useAuth from "../Hooks/useAuth";
import { useLocation } from "react-router";
import Forbidden from "../components/Forbidden";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const userRole = useRole();

  if (userRole === "Admin") {
    return children;
  }
  return <Forbidden />;
};

export default AdminRoute;
