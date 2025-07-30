/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { AuthContext } from "./AuthContext";
import { updateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (email) => {
    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/users/${email}`
      );
      if (!res.ok) throw new Error("User fetch failed");
      const userData = await res.json();
      setRole(userData.role);
    } catch (err) {
      setRole(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        fetchUserRole(currentUser.email);
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const createUser = async (email, password, name, photoURL = "") => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = result.user;

      await updateProfile(loggedUser, { displayName: name, photoURL });

      const saveUser = {
        name,
        email: loggedUser.email,
        photoURL,
        role: "user",
      };

      await fetch("https://bazar-bd-back-end-a12.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      fetchUserRole(loggedUser.email);

      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      fetchUserRole(email);

      return result;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;

      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: "user",
      };

      await fetch("https://bazar-bd-back-end-a12.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      fetchUserRole(loggedUser.email);

      return result;
    } catch (error) {
      console.error("Google Sign-in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setRole(null);
        setUser(null);
        setLoading(false);
        console.log("Successfully logged out");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error logging out:", error);
      });
  };

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
