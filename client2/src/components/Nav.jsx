import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    // navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-8xl mx-auto px-9 py-3 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <NavLink to="/" className="hover:text-blue-400">
            E_COMMERCE
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <div className="space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-blue-300"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-blue-300"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-blue-300"
              }
            >
              Contact
            </NavLink>
          </div>
          <div>
            {!auth.user ? (
              <div className="space-x-6">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  SignUp
                </NavLink>

                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  SignIn
                </NavLink>
              </div>
            ) : auth.user.isAdmin ? (
              // Seller options
              <div className="space-x-6">
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  Admin Dashboard
                </NavLink>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  My Products
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/signin"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  Logout
                </NavLink>
              </div>
            ) : (
              // Regular user options
              <div className="space-x-6">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/signin"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-blue-300"
                  }
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
