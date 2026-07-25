import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";

/**
 * Auth screens only — authenticated users go to Dashboard.
 */
export default function PublicOnlyRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
