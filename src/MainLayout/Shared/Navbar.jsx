import React from "react";
import { NavLink } from "react-router";
import Logo from "../../components/Logo";

import Toggle from "../../components/Toggle";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const handleSignout = () => {
    userLogout()
      .then(() => {
        toast.success("Successfully Signed Out!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Links = (
    <>
      <div className="flex items-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/all-loans">All Loans</NavLink>
        </li>
        <li>
          <NavLink to="/about-us">About Us</NavLink>
        </li>

        <li>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </li>
        {user ? (
          <>
            <div className="flex items-center">
              <li onClick={handleSignout}>
                <button className="md:btn btn-primary btn-outline">
                  Logout
                </button>
              </li>
              <li>
                <img className="w-16" src={user.photoURL} alt="" />
              </li>
            </div>
          </>
        ) : (
          <>
            <li>
              <NavLink className="md:btn btn-primary btn-outline" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="md:btn btn-primary btn-outline md:mx-5"
                to="/Register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </div>
    </>
  );
  return (
    <div>
      <div className="md:px-10 navbar bg-base-300 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          {/* logo */}
          <Logo />
        </div>

        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
