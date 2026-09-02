import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogoutRequest } from "../api/authApi";
import { toast } from "../components/Ui/toast";
import { setAuthTokens } from "../store/slices/authSlice";
import { performLogout } from "../api/client";

/**
 * React Query mutation for admin logout.
 * Clears admin tokens and redirects to admin login page.
 */
export function useAdminLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["auth", "admin-logout"],
    mutationFn: adminLogoutRequest,
    onSuccess: () => {
      // Clear tokens from Redux
      dispatch(
        setAuthTokens({
          accessToken: null,
          refreshToken: null,
          admin: null,
        })
      );

      // Clear from localStorage
      performLogout();

      toast.success("Admin logged out successfully.");

      // Redirect to admin login
      navigate("/admin/login", { replace: true });
    },
    onError: (error) => {
      console.warn("Logout error:", error);
      
      // Clear tokens anyway, even if API call fails
      dispatch(
        setAuthTokens({
          accessToken: null,
          refreshToken: null,
          admin: null,
        })
      );
      performLogout();

      // Still redirect to login
      navigate("/admin/login", { replace: true });
    },
  });
}

export default useAdminLogout;
