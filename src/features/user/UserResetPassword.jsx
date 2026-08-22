import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { resetUserPassword } from "../../api/userApi";
import { toast } from "../../components/Ui/toast";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function UserResetPasswordModal({
  isOpen,
  onClose,
  userEmail = "",
  userId = "",
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validatePassword = () => {
    const errs = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    if (!validatePassword()) return;

    if (!userId) {
      toast.error("Unable to reset password: no user selected.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await resetUserPassword(userId, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      toast.success("Password updated successfully.");
      onClose();
    } catch (err) {
      console.error("Failed to reset password", err);
      toast.error(err?.message || "Failed to reset password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full max-w-[440px] border border-[#27272a] rounded-2xl p-5 md:p-6 flex flex-col gap-4 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8e8e93] hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="pb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Reset Password
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="mt-1 block text-[12px]"
          >
            Provide a new password for the selected user.
          </MainLayoutColor>
        </div>

        {userEmail ? (
          <div className="flex flex-col gap-1.5">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block font-medium text-[12px]"
            >
              Email Address
            </MainLayoutColor>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full bg-[#18181b]/50 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-[#71717a] outline-none cursor-not-allowed"
            />
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block font-medium text-[12px]"
            >
              New Password
            </MainLayoutColor>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword)
                  setErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
              placeholder="Create a new password"
              autoComplete="new-password"
              className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] outline-none focus:border-[var(--color-yellow,#ffd60a)] transition-colors"
            />
            {errors.newPassword && (
              <span className="text-rose-400 text-[10px]">{errors.newPassword}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block font-medium text-[12px]"
            >
              Confirm Password
            </MainLayoutColor>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] outline-none focus:border-[var(--color-yellow,#ffd60a)] transition-colors"
            />
            {errors.confirmPassword && (
              <span className="text-rose-400 text-[10px]">{errors.confirmPassword}</span>
            )}
          </div>

          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed -mt-0.5 block text-[11px]"
          >
            Use at least 8 characters, including uppercase, lowercase, a number, and a special character.
          </MainLayoutColor>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]">
            <MainHeaderActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isUpdatingPassword}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
            >
              <span className="text-[14px] font-medium whitespace-nowrap leading-none">
                Cancel
              </span>
            </MainHeaderActionButton>

            <MainHeaderActionButton
              type="submit"
              disabled={isUpdatingPassword}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ffd60a] hover:bg-[#e6c200] text-black font-bold border border-[#ffd60a] cursor-pointer disabled:opacity-50"
            >
              {isUpdatingPassword && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
              <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </span>
            </MainHeaderActionButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}