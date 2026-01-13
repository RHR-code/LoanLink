import React from "react";
import Logo from "../../components/Logo";
import logoImg from "../../assets/investment.png";
import { Link, NavLink, Outlet } from "react-router";
import { HiUsers } from "react-icons/hi2";
import {
  RiAddCircleLine,
  RiCheckboxCircleLine,
  RiMoneyDollarCircleLine,
  RiSettings3Line,
  RiTimeLine,
  RiUserStarLine,
} from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import useRole from "../../Hooks/useRole";
import Toggle from "../../components/Toggle";
import Footer from "../../MainLayout/Shared/Footer";
import { FaCashRegister, FaUser } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";

const DashboardLayout = () => {
  const { userRole } = useRole();
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold"> {userRole} Dashboard</div>
          <Toggle />
        </nav>
        {/* Page content here */}
        <Outlet />
        <Footer />
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <Link to="/">
                  <img
                    className="is-drawer-open:hidden my-3"
                    src={logoImg}
                    alt=""
                  />
                </Link>

                <span className="is-drawer-close:hidden mb-5">
                  <Logo />
                </span>
              </button>
            </li>

            {/* ADMIN ONLY PAGES */}
            {userRole === "Admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/all-loan"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="All Loans"
                  >
                    {/* Loans icon */}
                    <RiMoneyDollarCircleLine />
                    <span className="is-drawer-close:hidden">All Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black my-3`
                    }
                    data-tip="Manage Users"
                  >
                    {/* users icon */}
                    <HiUsers />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/loan-applications"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="Loan Applications"
                  >
                    {/* loan application icon */}
                    <RiFileList3Line />
                    <span className="is-drawer-close:hidden">
                      Loan Applications
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* MANAGER ONLY PAGES */}
            {userRole === "Manager" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-loan"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="Add Loan"
                  >
                    <RiAddCircleLine />
                    <span className="is-drawer-close:hidden">Add Loan</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-loans"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black my-3`
                    }
                    data-tip="Manage Loans"
                  >
                    <RiSettings3Line />
                    <span className="is-drawer-close:hidden">Manage Loans</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/pending-loans"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="Pending Loans"
                  >
                    <RiTimeLine />
                    <span className="is-drawer-close:hidden">
                      Pending Loans
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approved-loans"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black my-3`
                    }
                    data-tip="Approved Loans"
                  >
                    <RiCheckboxCircleLine />
                    <span className="is-drawer-close:hidden">
                      Approved Loans
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manager-profile"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="Manager Profile"
                  >
                    <RiUserStarLine />
                    <span className="is-drawer-close:hidden">
                      Manager Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* User Only Pages */}
            {userRole === "User" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-loans"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="My Loans"
                  >
                    <RiAddCircleLine />
                    <span className="is-drawer-close:hidden">My Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/apply-loan"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right my-3 border border-black`
                    }
                    data-tip="Apply For A Loan"
                  >
                    <FaCashRegister />
                    <span className="is-drawer-close:hidden">Apply Loan</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-black text-white" : ""
                      } is-drawer-close:tooltip    is-drawer-close:tooltip-right border border-black`
                    }
                    data-tip="My Profile"
                  >
                    <FaUser />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* Avatar */}
          <div className="flex items-center justify-evenly w-full mb-5">
            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-blue-500 is-drawer-close:w-10 is-drawer-close:h-10">
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="is-drawer-close:hidden text-center">
              <h2 className="font-bold ">{user.displayName}</h2>
              <h4 className="font-semibold">{user.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
