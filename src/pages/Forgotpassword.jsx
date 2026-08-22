import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, X, LoaderCircle } from "lucide-react";
import AuthShell, { AuthField } from "../features/auth/AuthShell";
import { toast } from "../components/Ui/toast";
import { forgotPasswordRequest } from "../api/authApi";
import MainLayoutButton from "../components/Ui/MainLayoutUI/MainLayoutButton";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPasswordRequest({ username: email.trim() });
      toast.success("Verification code sent to your email.");
      navigate("/otp-verification", { state: { email: email.trim() } });
    } catch (err) {
      toast.error(err?.message || "Failed to send verification code. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      variant="split"
      title="Forgot Password?"
      subtitle={"Enter your registered email address. We'll send you a verification code to reset your password."}
      onClose={() => navigate('/login')}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter your registered email"
          autoComplete="email"
          disabled={isLoading}
          error={error}
          className="bg-[#0B0C10] border-gray-800 text-white placeholder-gray-500 focus:border-[#F5B700]"
        />

        <div className="flex flex-col gap-4 mt-2">
          <MainLayoutButton
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full h-[48px] rounded-lg text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={18} />
                <span>Sending Code...</span>
              </div>
            ) : (
              "Send Code"
            )}
          </MainLayoutButton>

          <Link to="/login" className="flex items-center border-1 border-zinc-700 rounded-lg p-2 justify-center gap-2 text-sm font-medium text-[#F5B700] hover:text-[#d9a200] transition-colors py-2">
            <ArrowLeft size={16} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}