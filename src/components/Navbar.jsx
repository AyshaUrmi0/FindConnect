import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Authcontext from "../context/Authcontext/Authcontext";
import { toast } from "react-toastify";
import auth from "../firebase/firebase.init";

const Navbar = () => {
  const { user, signOutUser } = useContext(Authcontext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full text-white lg:px-20 sm:px-10 bg-gradient-to-r from-orange-400 via-red-500 to-red-600 navbar">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold">
          FindConnect
        </Link>
      </div>

      {/* Center Navigation Links (Large Devices) */}
      <div className="hidden navbar-center lg:flex">
        <ul className="menu menu-horizontal">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allItems" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
              Lost & Found Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
              How It Works
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/addItems" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
                  Add Lost Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/myItems" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
                  Manage My Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/recoveredItems" className={({ isActive }) => (isActive ? "border-b-2 border-white" : "hover:text-gray-200")}>
                  All Recovered Items
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 navbar-end">
        {!user ? (
          <Link to="/login" className="text-blue-600 bg-white btn btn-sm hover:bg-gray-200">
            Login
          </Link>
        ) : (
          <>
            {/* Profile Picture Dropdown (Large Devices) */}
            <div className="relative hidden dropdown dropdown-end lg:block">
              <button tabIndex={0} onClick={toggleDropdown} className="btn btn-ghost btn-circle avatar" title={user.displayName || "User"}>
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-avatar.png"} alt="User" />
                </div>
              </button>
            </div>
            {/* Logout Button for Large Devices */}
            <button onClick={handleSignOut} className="hidden px-4 py-2 text-sm text-red-600 bg-white rounded lg:block hover:bg-gray-200">
              Logout
            </button>
            {/* Profile Picture Tooltip (Small Devices) */}
            <div className="tooltip tooltip-bottom lg:hidden" data-tip={user.displayName || "User"}>
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navbar Drawer for Small Screens */}
      <div className="navbar-center lg:hidden">
        <div className="drawer">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <button onClick={() => (document.getElementById("nav-drawer").checked = true)} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5" />
              </svg>
            </button>
          </div>
          <div className="drawer-side">
            <label htmlFor="nav-drawer" className="drawer-overlay"></label>
            <ul className="w-64 p-4 text-black bg-white menu">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allItems" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                  Lost & Found Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                  How It Works
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/addItems" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                      Add Lost Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myItems" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                      Manage My Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/recoveredItems" className={({ isActive }) => (isActive ? "border-b-2 border-black" : "hover:text-gray-600")} onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                      All Recovered Items
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="hover:bg-gray-100">
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/login" onClick={() => (document.getElementById("nav-drawer").checked = false)}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
