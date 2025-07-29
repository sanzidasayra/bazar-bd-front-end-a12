import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Shared/Spinner";
import useVendor from "../hooks/useVendor";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isVendor, isVendorLoading] = useVendor();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isVendorLoading && user && !isVendor) {
      toast.warn("🚫 You are not allowed to access this page!");
    }
  }, [loading, isVendorLoading, user, isVendor]);

  if (loading || isVendorLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isVendor) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
