import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { auth } from '../../../Firebase';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = ({ email }) => {
    setMessage('');
    setError('');
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Check your inbox.');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full sm:max-w-sm md:max-w-md mx-auto mt-20 mb-20">
      <h2 className="text-2xl font-bold text-[#03373D] text-center mb-4">Reset Your Password</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Enter your email to receive a reset link</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="Enter your email"
          className="input input-bordered w-full py-2 px-3 text-sm"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn bg-[#CAEB66] w-full mt-2 py-2 text-sm">
          Send Reset Link
        </button>

        <p className="text-sm mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
