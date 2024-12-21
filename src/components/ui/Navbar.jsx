import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaMoon } from "react-icons/fa6";
import logo from "../../assets/logo/logo.png";

function Navbar({ toggleTheme, currentTheme }) {
  const location = useLocation();

  const [showUserName, setShowUserName] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        toast.success("User logged out successfully");
        navigate("/"); // Navigate after successful logout
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
  };

  return (
    <div className="navbar bg-secondary pr-6">
      <div className="navbar-start">
        <div className="dropdown z-20">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li>
              <button
                onClick={() => {
                  user ? handleLogout() : null;
                  user ? navigate("/") : navigate("/login");
                }}
                className="text-neutral"
              >
                {user ? "Logout" : "Login"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  user ? null : navigate("/signup");
                }}
                className="text-neutral"
              >
                {user ? user.displayName || user.email : "Signup"}
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/")} className="text-neutral">
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/available-foods")}
                className="text-neutral"
              >
                Available Foods
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/add-food")}
                className="text-neutral"
              >
                Add Food
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/manage-food")}
                className="text-neutral"
              >
                Manage Food
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/food-requests")}
                className="text-neutral"
              >
                Food Requests
              </button>
            </li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="flex items-center gap-x-2 text-sm sm:text-3xl font-semibold text-neutral"
        >
          <img className="w-20 h-20" src={logo} alt="" />
          <p>ShareBites</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button
              onClick={() => navigate("/")}
              className={`text-neutral ${
                location.pathname === "/" && "active"
              }`}
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/available-foods")}
              className={`text-neutral ${
                location.pathname === "/available-foods" && "active"
              }`}
            >
              Available Foods
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/add-food")}
              className={`text-neutral ${
                location.pathname === "/add-food" && "active"
              }`}
            >
              Add Food
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/manage-food")}
              className={`text-neutral ${
                location.pathname === "/manage-food" && "active"
              }`}
            >
              Manage Food
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/food-requests")}
              className={`text-neutral ${
                location.pathname === "/food-requests" && "active"
              }`}
            >
              Food Requests
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end relative">
        <button
          onClick={() => {
            user ? handleLogout() : null;
            user ? navigate("/") : navigate("/login");
          }}
          className="text-neutral dark:text-white hover:text-gray-800 btn bg-primary border-transparent hover:bg-accent hidden md:block"
        >
          {user ? "Logout" : "Login"}
        </button>
        {!user && (
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="text-neutral dark:text-white hover:text-gray-800 btn bg-primary border-transparent hover:bg-accent hidden md:block ml-4"
          >
            Signup
          </button>
        )}
        {user && (
          <div
            onMouseEnter={() => setShowUserName(true)}
            onMouseLeave={() => setShowUserName(false)}
            className=" sm:pr-6 pl-5 cursor-pointer"
          >
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-neutral object-cover"
            />
          </div>
        )}
        {showUserName && (
          <div className="text-neutral dark:text-white font-medium text-xl btn bg-primary border-transparent hover:bg-accent absolute top-1 right-44">
            {user.displayName}
          </div>
        )}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center ml-4"
        >
          <div className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <FaMoon className="text-2xl" />
          </div>
          <p className="text-sm">
            {currentTheme === "light" ? "Dark" : "Light"} Mode
          </p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
