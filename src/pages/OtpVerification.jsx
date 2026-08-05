import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Button from "../components/Ui/Button";
import AuthShell from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import { forgotPasswordRequest, verifyOtpRequest } from "../api/authApi";

function maskEmail(email) {
  if (!email) return "your email";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 3);
  return `${visible}****@${domain}`;
}

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newCode = [...code];
    digits.forEach((digit, i) => {
      newCode[i] = digit;
    });
    setCode(newCode);

    const nextFocusIndex = Math.min(digits.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length < 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    if (!email) {
      toast.error("Unable to verify. Please start password recovery again.");
      return;
    }

    setIsLoading(true);

    try {
      await verifyOtpRequest({ username: email, otp: verificationCode });
      toast.success("Identity verified successfully!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.message || "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    if (!email) {
      toast.error("Unable to resend. Please start password recovery again.");
      return;
    }

    setTimer(30);
    setCanResend(false);
    setIsLoading(true);

    try {
      await forgotPasswordRequest({ username: email });
      toast.success("A new verification code has been sent.");
    } catch (err) {
      toast.error(err?.message || "Unable to resend verification code.");
      setCanResend(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      variant="split"
      title="Verify Your Identity"
      subtitle={
        <>
          Enter the 6-digit verification code sent to <br />
          <span className="text-gray-300 font-medium">{maskEmail(email)}</span>
        </>
      }
      onClose={() => navigate("/login")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Verification Code
          </label>
          <div className="flex items-center justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-semibold bg-[#0B0C10] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#F5B700] transition-colors"
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify Code"
            )}
          </Button>

          <div className="text-center text-sm text-gray-400 py-1">
            {canResend ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-gray-400">Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-[#F5B700] hover:underline font-medium cursor-pointer"
                >
                  Resend Code
                </button>
              </div>
            ) : (
              <span>
                You can resend code in{" "}
                <span className="text-white font-semibold">{timer} sec</span>
              </span>
            )}
          </div>
        </div>
      </form>
    </AuthShell>
  );
}