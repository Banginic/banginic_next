import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const appContext = useContext(AppContext);
  const location = useLocation();

  if (!appContext?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
