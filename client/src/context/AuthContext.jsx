import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setIsLoggedIn(true);
        setToken(storedToken);
      }
    }, [token]);
  
    const login = (newToken) => {
      setIsLoggedIn(true);
      setToken(newToken);
      localStorage.setItem('token', newToken);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      setToken(null);
      localStorage.removeItem('token');
    };
  
    // Provide the context values to the children components
    return (
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  