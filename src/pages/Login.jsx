import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Login";
    document.title = pageTitle;
  }, [location]);

  const { user, loginUser, googleSignIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
      toast.success("User logged in successfully!");
    } catch (error) {
      toast.error("An error occurred while logging in");
      console.error("Error logging in:", error.message);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     axios
  //       .post("http://localhost:3000/jwt-auth", {
  //         email: formData.email,
  //         password: formData.password,
  //       }, {withCredentials: true})
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setFormData({ email: "", password: "" });
  //     emailRef.current.value = "";
  //     passwordRef.current.value = "";
  //     navigate("/");
  //     toast.success("User logged in successfully!");
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.error("Error logging in:", error.message);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success("User logged in successfully!");
    } catch (error) {
      toast.error(error.message);
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-base-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-primary rounded-lg shadow-md">
        <div className="">
          {user && (
            <div className="p-4 text-center text-green-600 bg-green-100 rounded-md flex flex-col justify-center items-center gap-2">
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-20 rounded-full border-2 border-neutral"
              />
              <p className="">
                Logged in successfully! {user.displayName || user.email}
              </p>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-medium text-white bg-secondary rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <button
            onClick={() => handleGoogleSignIn()}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FaGoogle />
            <p className="text-lg">Login with Google</p>
          </button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup here
            </Link>
          </p>
          {/* <p className="text-sm text-center text-gray-600">
            Forgot Password?{" "}
            <Link
              to="/forgot-password"
              state={{ email: formData.email }}
              className="text-blue-500 hover:underline"
            >
              Click to Reset
            </Link>
          </p> */}
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
