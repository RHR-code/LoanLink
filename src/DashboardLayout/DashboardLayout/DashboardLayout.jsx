import React from "react";
import Logo from "../../components/Logo";
import logoImg from "../../assets/investment.png";
import { Link, Outlet } from "react-router";
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

const DashboardLayout = () => {
  const { userRole } = useRole();
  console.log(userRole);
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
          <div className="px-4"> {userRole} Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet />
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
                  <img className="is-drawer-open:hidden" src={logoImg} alt="" />
                </Link>

                <span className="is-drawer-close:hidden">
                  <Logo />
                </span>
              </button>
            </li>

            {/* ADMIN ONLY PAGES */}
            {userRole === "Admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/all-loan"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Loans"
                  >
                    {/* Loans icon */}
                    <RiMoneyDollarCircleLine />
                    <span className="is-drawer-close:hidden">All Loans</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    {/* users icon */}
                    <HiUsers />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/loan-applications"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Loan Applications"
                  >
                    {/* loan application icon */}
                    <RiFileList3Line />
                    <span className="is-drawer-close:hidden">
                      Loan Applications
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* MANAGER ONLY PAGES */}
            {userRole === "Manager" && (
              <>
                <li>
                  <Link
                    to="/dashboard/add-loan"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Loan"
                  >
                    <RiAddCircleLine />
                    <span className="is-drawer-close:hidden">Add Loan</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manage-loans"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Loans"
                  >
                    <RiSettings3Line />
                    <span className="is-drawer-close:hidden">Manage Loans</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/pending-loans"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Pending Loans"
                  >
                    <RiTimeLine />
                    <span className="is-drawer-close:hidden">
                      Pending Loans
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/approved-loans"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approved Loans"
                  >
                    <RiCheckboxCircleLine />
                    <span className="is-drawer-close:hidden">
                      Approved Loans
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manager-profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manager Profile"
                  >
                    <RiUserStarLine />
                    <span className="is-drawer-close:hidden">
                      Manager Profile
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* User Only Pages */}
            <li>
              <Link
                to="/dashboard/my-loans"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Loans"
              >
                <RiAddCircleLine />
                <span className="is-drawer-close:hidden">My Loans</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                <RiAddCircleLine />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {/* Setting */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
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
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
