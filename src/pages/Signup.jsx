import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthShell, { AuthField, AuthLink } from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import { selectIsAuthenticated } from "../store/slices/authSlice";

/**
 * Signup UI only — no backend registration.
 * // TODO: Replace mock signup with real registration API
 */
export default function Signup() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const errors = {};

    if (!fullName.trim()) errors.fullName = "Full name is required.";
    if (!username.trim()) errors.username = "Username is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // TODO: Replace mock signup with real registration API
    // Do not create users. No API call.
    toast.error("Account creation is currently disabled.");
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Join SafarTrak to manage your fleet"
      footer={
        <>
          Already have an account? <AuthLink to="/login">Sign in</AuthLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          id="fullName"
          label="Full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (fieldErrors.fullName) {
              setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
            }
          }}
          placeholder="Enter your full name"
          autoComplete="name"
          error={fieldErrors.fullName}
        />

        <AuthField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (fieldErrors.username) {
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
            }
          }}
          placeholder="Choose a username"
          autoComplete="username"
          error={fieldErrors.username}
        />

        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          placeholder="you@company.com"
          autoComplete="email"
          error={fieldErrors.email}
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
          placeholder="Create a password"
          autoComplete="new-password"
          error={fieldErrors.password}
        />

        <AuthField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
          }}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={fieldErrors.confirmPassword}
        />

        <MainLayoutButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-10 mt-1"
        >
          Create account
        </MainLayoutButton>
      </form>
    </AuthShell>
  );
}
