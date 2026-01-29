import React, { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }, []);

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
