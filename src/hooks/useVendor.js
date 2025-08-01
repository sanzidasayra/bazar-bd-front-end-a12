import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useVendor = () => {
  const { user } = useContext(AuthContext);
  const [isVendor, setIsVendor] = useState(false);
  const [isVendorLoading, setIsVendorLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setIsVendor(false);
      setIsVendorLoading(false);
      return;
    }

    setIsVendorLoading(true);
    fetch(`https://bazar-bd-back-end-a12.onrender.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsVendor(data.role === "vendor" || data.role === "admin" );
        setIsVendorLoading(false);
      })
      .catch(() => {
        setIsVendor(false);
        setIsVendorLoading(false);
      });
  }, [user?.email]);

  return [isVendor, isVendorLoading];
};

export default useVendor;
