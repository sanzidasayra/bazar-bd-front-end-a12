/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify"; 

const Register = () => {
  const { createUser, signIn, signInWithGoogle } = useAuth(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(
        data.email,
        data.password,
        data.name,
        data.photo
      );
      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photo,
      });

      const savedUser = {
        name: data.name,
        email: data.email,
        role: "user",
      };

      await fetch(
        "https://bazar-bd-back-end-a12.onrender.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedUser),
        }
      );

      await signIn(data.email, data.password);

      toast.success("Your account was created and you are now logged in!");

      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 500); 
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Logged in with Google!");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        toast.error("Google login error");
      });
  };

  return (
    <div className='bg-white p-4 rounded-xl shadow-md w-full max-w-md mx-auto sm:px-4 md:px-8 mt-16 mb-20'>
      <h2 className='text-3xl font-bold text-[#03373D] text-center mb-2'>
        Create an Account
      </h2>
      <p className='text-gray-500 text-sm text-center mb-6'>
        Register with Profast
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <input
          type='text'
          {...register("name", { required: "Name is required" })}
          placeholder='Full Name'
          className='input input-bordered w-full py-2 px-3 text-sm'
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}

        <input
          type='email'
          {...register("email", { required: "Email is required" })}
          placeholder='Email'
          className='input input-bordered w-full py-2 px-3 text-sm'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <input
          type='text'
          {...register("photo", { required: "Photo URL is required" })}
          placeholder='Photo URL'
          className='input input-bordered w-full py-2 px-3 text-sm'
        />
        {errors.photo && (
          <p className='text-red-500 text-sm'>{errors.photo.message}</p>
        )}

        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder='Password'
            className='input input-bordered w-full py-2 px-3 text-sm'
          />
          <div
            className='absolute right-3 top-3 cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className='text-xl' />
            ) : (
              <FaEye className='text-xl' />
            )}
          </div>
        </div>
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <button
          type='submit'
          className='btn bg-[#CAEB66] w-full mt-4 py-2 text-sm'
        >
          Sign Up
        </button>

        <p className='text-sm mt-2 text-center'>
          Already have an account?{" "}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>

        <div className='divider'>or</div>

        <button
          type='button'
          onClick={handleGoogleLogin}
          className='btn btn-outline w-full flex items-center justify-center gap-2 py-2 text-sm'
        >
          <FcGoogle className='text-xl' />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
