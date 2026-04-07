import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserData } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/api/auth/login`, payload, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        setUserData(res.data.user);
      }
    } catch (error) {
      console.log(
        "error occured while login",
        error.response?.data || error.message,
      );
      setError(
        error.response?.data?.message || "An error occurred during login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-8">
        <img src="linkedin.svg" alt="" className="h-10" />
      </div>

      {/* login form */}
      <form
        className="md:max-w-md mx-auto shadow-xl border border-gray-200 p-6 rounded-lg"
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-semibold">Login</h1>

        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          className="p-2 w-full border border-gray-400 outline-none rounded-md mt-5"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 w-full border border-gray-400 outline-none rounded-md mt-5"
        />

        {error && <p className="mt-2 text-red-600">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded-md mt-9 hover:bg-blue-700 transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>

        <div className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
