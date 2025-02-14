import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Authcontext from "../context/Authcontext/Authcontext";
import { toast } from "react-toastify";
import auth from "../firebase/firebase.init";
import { ThemeContext } from "../context/Authcontext/ThemeContext";
import { LogOut, Moon, Sun, Search, Menu } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useContext(Authcontext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed top-0 left-0 z-50 w-full mb-5 border-b backdrop-blur-md bg-base-100/80 border-base-200 dark:border-base-700 lg:px-15 sm:px-10 navbar">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-3xl font-black logo-text font-display">
          Find<span className="text-primary">Connect</span>
        </Link>
      </div>

      {/* Center Navigation Links (Large Devices) */}
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-2 menu menu-horizontal">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-base-200 text-base-content"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/allItems" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-base-200 text-base-content"
                }`
              }
            >
              Lost & Found Items
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-base-200 text-base-content"
                }`
              }
            >
              How It Works
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink 
                  to="/addItems" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  Add Lost Item
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/myItems" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  Manage My Items
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/recoveredItems" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  All Recovered Items
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 navbar-end">
        <button 
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        
        {!user ? (
          <Link 
            to="/login" 
            className="normal-case btn btn-primary btn-sm"
          >
            Login
          </Link>
        ) : (
          <button 
            onClick={handleSignOut} 
            className="gap-2 normal-case btn btn-error btn-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>

      {/* Navbar Drawer for Small Screens */}
      <div className="navbar-center lg:hidden">
        <div className="drawer">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label 
              htmlFor="nav-drawer" 
              className="btn btn-ghost btn-circle drawer-button"
            >
              <Menu className="w-5 h-5" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="nav-drawer" className="drawer-overlay"></label>
            <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
              <li className="mb-2">
                <button 
                  className="justify-start gap-2 btn btn-ghost"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-5 h-5" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      Light Mode
                    </>
                  )}
                </button>
              </li>
              <div className="divider"></div>
              <li>
                <NavLink to="/" className="active:bg-primary/20">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allItems" className="active:bg-primary/20">
                  Lost & Found Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="active:bg-primary/20">
                  How It Works
                </NavLink>
              </li>
              {user && (
                <>
                  <div className="divider">User Menu</div>
                  <li>
                    <NavLink to="/addItems" className="active:bg-primary/20">
                      Add Lost Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myItems" className="active:bg-primary/20">
                      Manage My Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/recoveredItems" className="active:bg-primary/20">
                      All Recovered Items
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleSignOut}
                      className="gap-2 text-error"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link 
                    to="/login" 
                    className="mt-4 btn btn-primary"
                  >
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