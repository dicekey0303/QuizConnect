import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  return isAuthenticated && role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;