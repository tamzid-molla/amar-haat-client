import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase/FirebaseInit";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const FirebaseContext = ({ children }) => {
  //Login User state
    const [user, setUser] = useState(null);

  //Loading state
  const [loading, setLoading] = useState(true);

  const { data: userRole = {}, isPending } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_baseURL}/users/role/${user?.email}`);
      return res.data;
      },
  });
    
  //Register user with email and password
  const registerWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Login with email and password
  const loginWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Login with google
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  //Update user
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //Log out user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //On Auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    registerWithEmailPass,
    loginWithEmailPass,
    user,
    setUser,
    setLoading,
    loading,
    updateUser,
    logOutUser,
      googleLogin,
    role: userRole?.role,
      isPending,
    
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
