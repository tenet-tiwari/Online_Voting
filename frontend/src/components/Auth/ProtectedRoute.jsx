// src/components/Auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    // If token is invalid, redirect to login page
    return <Navigate to="/" replace />;
  }

  const userRole = decodedToken.role;

  if (role && role !== userRole) {
    // If role is specified and doesn't match user role, redirect to a not authorized page or home
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
