import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setIsUser(false);
      setIsUserLoading(false);
      return;
    }

    setIsUserLoading(true);
    fetch(`https://bazar-bd-back-end-a12.onrender.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsUser(data.role === "user" || data.role === "admin" );
        setIsUserLoading(false);
      })
      .catch(() => {
        setIsUser(false);
        setIsUserLoading(false);
      });
  }, [user?.email]);

  return [isUser, isUserLoading];
};

export default useUser;
