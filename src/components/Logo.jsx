import React from "react";
import { Link } from "react-router";
import logo from "../assets/investment.png";
const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-3xl flex items-center gap-2 font-bold">
        <img src={logo} className=" w-7 md:w-9" alt="" />
        <h1 className="text-2xl md:text-4xl">
          Loan<span className="text-primary -ml-.5">Link</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
