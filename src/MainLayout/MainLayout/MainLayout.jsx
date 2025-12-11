import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
