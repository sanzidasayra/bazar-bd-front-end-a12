import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardHome = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (!user) return <div className="dashboard-login">Please log in to access your dashboard.</div>;

 

  return (
    <div className="dashboard-home" style={{
      maxWidth: 480,
      margin: "40px auto",
      padding: "32px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 2px 16px #0001"
    }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>
        Welcome, {user.displayName || user.email || "User"}!
      </h1>
      <div style={{ marginBottom: 18 }}>
        <span style={{ fontWeight: 500 }}>Email:</span> <span style={{ color: "#4C4CFF" }}>{user.email}</span><br />
        <span style={{ fontWeight: 500 }}>Role:</span> <span style={{ textTransform: "capitalize" }}>{role || "user"}</span>
      </div>
      <hr style={{ margin: "16px 0 28px 0", borderColor: "#F0F0F0" }} />
    </div>
  );
};

export default DashboardHome;
