import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleNavMenu = () => {
    setNavMenuOpen((prev) => !prev);
  };

  return (
    <div className="px-20 text-white bg-gradient-to-r from-orange-400 via-red-500 to-red-600 navbar">
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
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allItems" className="hover:text-gray-200">
              Lost & Found Items
            </Link>
          </li>
          {!user && (
            <li>
              <Link to="/how-it-works" className="hover:text-gray-200">
                How It Works
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/addItems" className="hover:text-gray-200">
                  Add Lost Item
                </Link>
              </li>
              <li>
                <Link to="/myItems" className="hover:text-gray-200">
                  Manage My Items
                </Link>
              </li>
              <li>
                <Link to="/recoveredItems" className="hover:text-gray-200">
                  All Recovered Items
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 navbar-end">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-blue-600 bg-white btn btn-sm hover:bg-gray-200"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            {/* Profile Picture Dropdown (Large Devices) */}
            <div className="relative hidden dropdown dropdown-end lg:block">
              <button
                tabIndex={0}
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar"
                title={user.displayName || "User"}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-avatar.png"} alt="User" />
                </div>
              </button>
              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="absolute right-0 z-50 p-2 mt-2 text-black bg-white shadow dropdown-content menu rounded-box w-52"
                >
                  <li>
                    <Link to="/addItems" onClick={closeDropdown}>
                      Add Lost Item
                    </Link>
                  </li>
                  <li>
                    <Link to="/myItems" onClick={closeDropdown}>
                      Manage My Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/recoveredItems" onClick={closeDropdown}>
                      All Recovered Items
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeDropdown();
                        handleSignOut();
                      }}
                      className="hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
            {/* Logout Button for Large Devices */}
            <button
              onClick={handleSignOut}
              className="hidden px-4 py-2 text-sm text-red-600 bg-white rounded lg:block hover:bg-gray-200"
            >
              Logout
            </button>
            {/* Profile Picture Tooltip (Small Devices) */}
            <div
              className="tooltip tooltip-bottom lg:hidden"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navbar Dropdown for Small Screens */}
      <div className="navbar-center lg:hidden">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            onClick={toggleNavMenu}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </button>
          {navMenuOpen && (
            <ul
              tabIndex={0}
              className="z-50 p-2 text-black bg-white shadow dropdown-content menu rounded-box w-52"
            >
              <li>
                <Link to="/" onClick={() => setNavMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allItems" onClick={() => setNavMenuOpen(false)}>
                  Lost & Found Items
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to="/how-it-works" onClick={() => setNavMenuOpen(false)}>
                    How It Works
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li>
                    <Link to="/addItems" onClick={() => setNavMenuOpen(false)}>
                      Add Lost Item
                    </Link>
                  </li>
                  <li>
                    <Link to="/myItems" onClick={() => setNavMenuOpen(false)}>
                      Manage My Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/recoveredItems" onClick={() => setNavMenuOpen(false)}>
                      All Recovered Items
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setNavMenuOpen(false);
                        handleSignOut();
                      }}
                      className="hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/login" onClick={() => setNavMenuOpen(false)}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
