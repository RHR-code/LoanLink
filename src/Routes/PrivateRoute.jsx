import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { pathname } = useLocation();
  console.log(pathname, user);

  if (loading) return <Loader />;
  if (user) {
    return children;
  }
  return <Navigate state={pathname} to="/login" />;
};

export default PrivateRoute;
