import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLoginRequest } from "../api/authApi";
import { featureFlags } from "../config/featureFlags";
import { toast } from "../components/Ui/toast";
import { setAuthError, setAuthTokens } from "../store/slices/authSlice";

function resolveAdminLoginErrorMessage(error) {
  if (!error) return "Unable to sign in. Please try again.";

  if (error.status === 401 || error.status === 403) {
    return error.message || "Invalid username or password.";
  }

  if (error.status === 422) {
    return error.message || "Please check your username and password.";
  }

  if (error.code === "NETWORK_ERROR") {
    return "Network unavailable. Please check your connection.";
  }

  return error.message || "Unable to sign in. Please try again.";
}

/**
 * React Query mutation for admin login.
 * Handles admin authentication via POST /v1/admin/login
 */
export function useAdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: ["auth", "admin-login"],
    mutationFn: adminLoginRequest,
    onSuccess: (tokens) => {
      dispatch(
        setAuthTokens({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          admin: tokens.admin,
        })
      );

      toast.success("Admin signed in successfully.");

      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      const message = resolveAdminLoginErrorMessage(error);
      dispatch(setAuthError(error));
      toast.error(message);
    },
  });
}

export default useAdminLogin;
