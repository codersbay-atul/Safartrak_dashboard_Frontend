import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import { featureFlags } from "../config/featureFlags";
import { toast } from "../components/Ui/toast";
import { setAuthError, setCredentials } from "../store/slices/authSlice";

function resolveLoginErrorMessage(error) {
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
 * React Query mutation for login.
 * - UI mode: mock auth via authApi (no /v1/auth/* calls)
 * - Future: same hook, real POST /v1/auth/login when featureFlags.useMockAuth = false
 */
export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: loginRequest,
    onSuccess: (tokens) => {
      // Store demo/real tokens in Redux (and persisted storage via authSlice).
      dispatch(
        setCredentials({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      );

      toast.success(
        featureFlags.useMockAuth
          ? "Signed in (UI development mode)."
          : "Signed in successfully."
      );

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      const message = resolveLoginErrorMessage(error);
      dispatch(setAuthError(error));
      toast.error(message);
    },
  });
}

export default useLogin;
