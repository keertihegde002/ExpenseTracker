import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error, please try again later"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h3>
        <p className="text-sm text-gray-600 mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            type="email"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-lg transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-700 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-violet-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
