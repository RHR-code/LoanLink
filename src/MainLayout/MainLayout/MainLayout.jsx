import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
