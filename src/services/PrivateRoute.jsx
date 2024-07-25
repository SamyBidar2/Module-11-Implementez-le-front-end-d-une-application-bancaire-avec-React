import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element }) => {
  const isConnected = useSelector((state) => state.auth.userStatus.connected);
  return isConnected ? element : <Navigate to="/signIn" />;
};

