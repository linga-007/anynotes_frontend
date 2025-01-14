import React from "react";
import { Navigate , useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const token = Cookies.get("token");
    const location = useLocation();

  if (!token) {
    
    return <Navigate to={`/login?from=${location.pathname}`} replace />;
  }

  return children;
};

export default PrivateRoute;
