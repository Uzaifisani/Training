import { JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(GlobalContext);
  if (!state.isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default ProtectedRoute;