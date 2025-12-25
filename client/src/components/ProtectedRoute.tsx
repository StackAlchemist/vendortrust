import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Directly grab the token from localStorage
  const token = localStorage.getItem("token");

  // If the token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If it exists, show the requested page
  return <Outlet />;
};

export default ProtectedRoute;