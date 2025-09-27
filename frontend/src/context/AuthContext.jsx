import React from "react";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null); // stores user/coach info

  const login = (user) => {
    setAuthUser(user);
    localStorage.setItem("authUser", JSON.stringify(user)); // persist
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("authUser");
    window.location.href = "/"; // redirect to home
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) setAuthUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
