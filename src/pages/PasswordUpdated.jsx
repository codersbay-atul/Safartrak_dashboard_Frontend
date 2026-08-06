import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Button from "../components/Ui/Button";
import AuthShell from "../features/auth/AuthShell";

export default function PasswordUpdated() {
  const navigate = useNavigate();

  return (
    <AuthShell variant="split">
      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
          <Check className="text-green-500 stroke-[3]" size={20} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Password Updated
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your password has been changed successfully. You can now sign in using your new password.
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full h-[48px] mt-2 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] text-black text-[14px] font-semibold transition-colors flex items-center justify-center cursor-pointer"
      >
        Back to Sign In
      </Button>
    </AuthShell>
  );
}