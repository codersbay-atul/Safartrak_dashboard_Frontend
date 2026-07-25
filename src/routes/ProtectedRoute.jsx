import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";

/**
 * Protected Route
 * - If not authenticated → redirect to /login
 * - If authenticated → allow access to children (e.g. dashboard)
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
