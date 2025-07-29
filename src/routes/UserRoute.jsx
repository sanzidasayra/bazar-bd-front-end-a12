import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Shared/Spinner";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isUser, isUserLoading] = useUser();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isUserLoading && user && !isUser) {
      toast.warn("🚫 You are not allowed to access this page!");
    }
  }, [loading, isUserLoading, user, isUser]);

  if (loading || isUserLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
