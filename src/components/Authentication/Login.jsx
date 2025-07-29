import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Get the previous page the user wanted to visit

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Handle form submission for email/password login
  const onSubmit = (data) => {
    setLoginError(""); // Clear previous login errors
    const { email, password } = data;

    signIn(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Login successful!");
        navigate(from, { replace: true }); // Redirect to the intended page
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(error.message || "Login failed!");
        setLoginError(error.message);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true }); // Redirect to the intended page
      })
      .catch((error) => {
        console.error("Google Login error:", error.message);
        toast.error(error.message || "Google login failed!");
        setLoginError(error.message);
      });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full sm:max-w-sm md:max-w-md mx-auto sm:px-4 md:px-8 mt-16 mb-20">
      <h2 className="text-3xl font-bold text-[#03373D] text-center mb-2">Welcome Back</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Login to continue to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="input input-bordered w-full py-2 px-3 text-sm"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            placeholder="Password"
            className="input input-bordered w-full py-2 px-3 text-sm"
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
          </div>
        </div>

        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

        <div className="text-sm">
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn bg-[#CAEB66] w-full mt-4 py-2 text-sm">
          Login
        </button>

        <p className="text-sm mt-2 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="divider">or</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2 py-2 text-sm"
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
