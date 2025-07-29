import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAdminLoading && user && !isAdmin) {
      toast.warn("🚫 You are not allowed to access this page!");
    }
  }, [loading, isAdminLoading, user, isAdmin]);

  if (loading || isAdminLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
