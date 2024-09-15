import { Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

const ProtectedRoute = ({ children }) => {
  if (!auth.currentUser) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;