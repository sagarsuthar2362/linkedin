import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/api/auth/register`, payload, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log("error signing up", error.response?.data || error.message);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-8">
        <img src="linkedin.svg" alt="" className="h-10" />
      </div>

      {/* signup form */}
      <form
        className="md:max-w-md mx-auto shadow-xl border border-gray-200 p-6 rounded-lg"
        onSubmit={handleSignup}
      >
        <h1 className="text-4xl font-semibold">Signup</h1>

        <input
          type="text"
          name="firstName"
          placeholder="Firstname"
          className="p-2 w-full border border-gray-400 outline-none rounded-md mt-5"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          className="p-2 w-full border border-gray-400 outline-none rounded-md mt-5"
        />

        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="p-2 w-full border border-gray-400 outline-none rounded-md mt-5"
        />

        <input
          type="email"
          name="email"
          placeholder="Email" 
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
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer mt-9 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Signup
        </button>

        <div className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
