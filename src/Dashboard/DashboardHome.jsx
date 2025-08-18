import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardHome = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (!user) return <div className="dashboard-login">Please log in to access your dashboard.</div>;

  return (
    <div className="flex justify-center  dark:bg-gray-800 min-h-screen pt-10 pb-200">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-md bg-white dark:bg-gray-700 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300">
          Welcome, {user.displayName || user.email || "User"}!
        </h1>
        <div className="mb-4 text-gray-400 dark:text-gray-300 transition-colors duration-300">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-blue-500">{user.email}</span>
          </p>
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{role || "user"}</span>
          </p>
        </div>
        <hr className="border-gray-200 dark:border-gray-600 my-7" />
      </div>
    </div>
  );
};

export default DashboardHome;
