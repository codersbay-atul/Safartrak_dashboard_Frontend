import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { requestPasswordOtp, verifyPasswordOtp, changeAccountPassword } from "../../api/accountApi";
import { toast } from "../../components/Ui/toast";

export default function UserResetPasswordModal({ isOpen, onClose, userEmail = "" }) {
  const [email, setEmail] = useState(userEmail);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(60);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  useEffect(() => {
    let interval = null;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (!email) {
      toast.error("No email available to send OTP.");
      return;
    }

    setIsOtpSent(false);
    setTimer(30);
    setIsSendingOtp(true);
    requestPasswordOtp({ email })
      .then(() => {
        setIsOtpSent(true);
        toast.success("Verification code sent to the user's email.");
      })
      .catch((err) => {
        console.error("Failed to send OTP", err);
        toast.error(err?.message || "Failed to send OTP.");
      })
      .finally(() => setIsSendingOtp(false));
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "Please enter the OTP." }));
      return;
    }

    setIsVerifyingOtp(true);
    verifyPasswordOtp({ otp, email })
      .then(() => {
        setIsOtpVerified(true);
        toast.success("OTP verified. You can now set a new password.");
      })
      .catch((err) => {
        console.error("OTP verification failed", err);
        toast.error(err?.message || "OTP verification failed.");
      })
      .finally(() => setIsVerifyingOtp(false));
  };

  const validatePassword = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsUpdatingPassword(true);
    changeAccountPassword({ new_password: newPassword, confirm_password: confirmPassword })
      .then(() => {
        toast.success("Password updated successfully.");
        onClose();
      })
      .catch((err) => {
        console.error("Failed to change password", err);
        toast.error(err?.message || "Failed to update password.");
      })
      .finally(() => setIsUpdatingPassword(false));
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-[420px] bg-[#121316] border border-[#232428] rounded-xl p-6 flex flex-col gap-5 shadow-2xl relative select-none text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8e8e93] hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div>
          <h2 className="text-[18px] font-bold text-white tracking-tight">
            Reset Password
          </h2>
          <p className="text-[12px] text-[#8e8e93] mt-1">
            Verify OTP and create new password.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#8e8e93] font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-[#0a0b0d] border border-[#232428] rounded-lg px-3 py-2 text-[12px] text-[#71717a] outline-none cursor-not-allowed"
            />
          </div>

          {!isOtpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className={`w-full h-[42px] mt-1 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[13px] font-semibold transition-colors ${isSendingOtp ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              {isSendingOtp ? 'Sending...' : 'Send OTP'}
            </button>
          )}

          {isOtpSent && !isOtpVerified && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#8e8e93] font-medium">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
                  }}
                  placeholder="Enter received OTP"
                  className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
                />
                {errors.otp && (
                  <span className="text-red-400 text-[10px]">{errors.otp}</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
                className={`w-full h-[42px] rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[13px] font-semibold transition-colors ${isVerifyingOtp ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
              >
                {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center text-[11px] text-[#8e8e93]">
                {timer > 0 ? (
                  <span>
                    Resend OTP in <strong className="text-white">{timer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#F5B700] hover:underline font-semibold cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {isOtpVerified && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#8e8e93] font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
                  }}
                  placeholder="Create a new password"
                  autoComplete="new-password"
                  className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
                />
                {errors.newPassword && (
                  <span className="text-red-400 text-[10px]">{errors.newPassword}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#8e8e93] font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
                />
                {errors.confirmPassword && (
                  <span className="text-red-400 text-[10px]">{errors.confirmPassword}</span>
                )}
              </div>

              <p className="text-[10px] text-[#8e8e93] leading-relaxed -mt-1">
                Use at least 8 characters, including uppercase, lowercase, a number, and a special character.
              </p>

              <button
                type="submit"
                disabled={isUpdatingPassword}
                className={`w-full h-[42px] mt-1 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[13px] font-semibold transition-colors ${isUpdatingPassword ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
              >
                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}