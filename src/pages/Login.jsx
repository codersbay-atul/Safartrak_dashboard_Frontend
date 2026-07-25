import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Button from "../components/Ui/Button";
import AuthShell, { AuthField, AuthLink } from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import {
  MOCK_ACCESS_TOKEN,
  selectIsAuthenticated,
  setMockSession,
} from "../store/slices/authSlice";

const MOCK_USERNAME = "admin";
const MOCK_PASSWORD = "admin123";

function validateLoginForm({ username, password }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Username is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

/**
 * Temporary mock login screen (development only).
 * // TODO: Replace mock login with POST /v1/auth/login
 */
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateLoginForm({ username, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    // Simulate brief loading for UX (no network call).
    await new Promise((resolve) => setTimeout(resolve, 400));

    const isValid =
      username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD;

    if (!isValid) {
      setIsLoading(false);
      toast.error("Invalid username or password");
      return;
    }

    // TODO: Replace mock login with POST /v1/auth/login
    dispatch(
      setMockSession({
        user: {
          username: MOCK_USERNAME,
          displayName: "Admin",
        },
        accessToken: MOCK_ACCESS_TOKEN,
      })
    );

    setIsLoading(false);

    const redirectTo = location.state?.from?.pathname || "/dashboard";
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your SafarTrak fleet dashboard"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <AuthLink to="/signup">Create account</AuthLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (fieldErrors.username) {
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
            }
          }}
          placeholder="Enter your username"
          autoComplete="username"
          disabled={isLoading}
          error={fieldErrors.username}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isLoading}
          error={fieldErrors.password}
        />

        <div className="rounded-lg border border-[#27272a] bg-[#0B0F19] px-3 py-2 text-[10px] text-[#71717a]">
          Dev login:{" "}
          <span className="text-[#a1a1aa] font-medium">admin</span>
          {" / "}
          <span className="text-[#a1a1aa] font-medium">admin123</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full h-10 mt-1"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={14} className="animate-spin shrink-0" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
