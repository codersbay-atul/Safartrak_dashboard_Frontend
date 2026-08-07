import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Button from "../components/Ui/Button";
import AuthShell, { AuthField } from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import { loginRequest } from "../api/authApi";
import {
  selectIsAuthenticated,
  setMockSession,
} from "../store/slices/authSlice";

const REMEMBERED_USERNAME_KEY = "rememberedUsername";

function getRememberedUsername() {
  try {
    return localStorage.getItem(REMEMBERED_USERNAME_KEY) || "";
  } catch {
    return "";
  }
}

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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const rememberedUsername = getRememberedUsername();
  const [username, setUsername] = useState(rememberedUsername);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedUsername));
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

    try {
      const result = await loginRequest({
        username: username.trim(),
        password,
      });

      dispatch(
        setMockSession({
          user: result.user ?? { username: username.trim() },
          accessToken: result.accessToken ?? result.token,
        })
      );

      try {
        if (rememberMe) {
          localStorage.setItem(REMEMBERED_USERNAME_KEY, username.trim());
        } else {
          localStorage.removeItem(REMEMBERED_USERNAME_KEY);
        }
      } catch {
        // Ignore storage failures (private mode / quota).
      }

      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      // API returns 403 for invalid credentials ("Vehk rejected..."), not only 401.
      if (error?.status === 401 || error?.status === 403) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Unable to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      variant="split"
      title="Welcome Back"
      subtitle="Sign In to continue managing your fleet operations."
      sectionLabel="Login"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <AuthField
          id="username"
          label="Email"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (fieldErrors.username) {
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
            }
          }}
          placeholder="Enter your email"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 rounded border-[#2a2a32] bg-[#0a0a0f] accent-[#F5B700] cursor-pointer"
            />
            <span className="text-[12px] text-[#a1a1aa]">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-[12px] font-medium text-[#F5B700] hover:text-[#d9a200] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full h-[50px] mt-1 rounded-[10px] bg-[#F5B700] hover:bg-[#d9a200] text-black text-[14px] font-semibold"
        >
          {isLoading ? (
            <>
              <span>Signing in...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
