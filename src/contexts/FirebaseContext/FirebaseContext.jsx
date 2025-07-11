import React, { createContext } from "react";

export const AuthContext = createContext();

export const FirebaseContext = ({ children }) => {
  const userInfo = {
    name: "user",
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
