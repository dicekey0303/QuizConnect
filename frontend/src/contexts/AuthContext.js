import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthToken } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setRole(storedRole); // roleステートを更新する
    }
  }, []);

  const login = (token, role, callback) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuthToken(token);
    setIsAuthenticated(true);
    setRole(role);
    // 状態更新後にコールバック関数を呼び出す
    // callback(); 
  };

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthToken(null);
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthProvider 内で使用する必要があります');
  }
  return context;
};