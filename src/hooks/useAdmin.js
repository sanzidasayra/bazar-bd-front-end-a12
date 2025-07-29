import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setIsAdmin(false);
      setIsAdminLoading(false);
      return;
    }

    setIsAdminLoading(true);

    fetch(`https://bazar-bd-back-end-a12.onrender.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.role === "admin" || data.role === "user"  );
        setIsAdminLoading(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setIsAdminLoading(false);
      });
  }, [user?.email]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
