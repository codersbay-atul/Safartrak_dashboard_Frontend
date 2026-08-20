import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import AuthShell, { AuthField } from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import { resetPasswordRequest } from "../api/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!newPassword) {
      errs.newPassword = "New password is required.";
    } else if (!passwordRegex.test(newPassword)) {
      errs.newPassword = "Password does not meet requirements.";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!resetToken) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordRequest({
        token: resetToken,
        new_password: newPassword,
      });
      toast.success("Password updated successfully!");
      navigate("/password-updated");
    } catch (err) {
      toast.error(err?.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      variant="split"
      title="Create New Password"
      subtitle="Your new password must be different from your previous password."
      onClose={() => navigate("/login")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
          }}
          placeholder="Create a new password"
          autoComplete="new-password"
          disabled={isLoading}
          error={errors.newPassword}
        />

        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          disabled={isLoading}
          error={errors.confirmPassword}
        />

        <p className="text-xs text-gray-400 leading-relaxed -mt-1">
          Use at least 8 characters, including uppercase, lowercase, a number, and a special character.
        </p>

        <MainLayoutButton
          type="submit"
          disabled={isLoading}
          className="w-full h-[48px] mt-2 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin" size={18} />
              <span>Updating...</span>
            </>
          ) : (
            "Update Password"
          )}
        </MainLayoutButton>
      </form>
    </AuthShell>
  );
}