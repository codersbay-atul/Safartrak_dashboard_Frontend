import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth, selectIsAuthenticated } from "../store/slices/authSlice";

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

export default function useAccountInactivity(timeoutMs = INACTIVITY_TIMEOUT_MS) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    dispatch(clearAuth());

    localStorage.removeItem("access_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");

    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isAuthenticated) {
      timerRef.current = setTimeout(() => {
        handleLogout();
      }, timeoutMs);
    }
  }, [isAuthenticated, timeoutMs, handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ];

    const handleUserActivity = () => {
      resetTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAuthenticated, resetTimer]);
}