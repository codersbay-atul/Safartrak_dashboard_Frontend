import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function AccountDetails({ isOpen, onClose, onConfirm, initialData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setUsername("");
      setPassword("");
      setErrors({});
      return;
    }

    const user = initialData.user ?? initialData;
    setUsername(user.name || "");
    setPassword(initialData.temporary_password || "");
    setErrors({});
  }, [initialData]);

  if (!isOpen) return null;

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-8) + "@2026";
    setPassword(generated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required. Generate or enter a password.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (onConfirm) onConfirm({ username: username.trim(), password: password.trim() });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full max-w-[440px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col relative [&_button.absolute]:hidden"
      >
        {/* Header */}
        <div className="pb-3 mb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Account Details
          </MainLayoutColor>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Username */}
          <div className="w-full">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block mb-1 font-medium text-[12px]"
            >
              Username
            </MainLayoutColor>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors((prev) => ({ ...prev, username: undefined }));
                }
              }}
              className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition-colors"
            />
            {errors.username && (
              <p className="mt-1 text-[10px] text-rose-400">{errors.username}</p>
            )}
          </div>

          {/* Temporary Password */}
          <div className="w-full">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block mb-1 font-medium text-[12px]"
            >
              Temporary Password
            </MainLayoutColor>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                placeholder="Generate Secure Password"
                value={password}
                className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="p-2.5 rounded-xl border border-[#ffd60a]/40 bg-transparent text-[#ffd60a] hover:bg-[#ffd60a]/10 transition-colors cursor-pointer shrink-0"
                title="Generate Password"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[10px] text-rose-400">{errors.password}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#27272a]">
            <MainHeaderActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer"
            >
              <span className="text-[14px] font-medium whitespace-nowrap leading-none">
                Cancel
              </span>
            </MainHeaderActionButton>

            <MainHeaderActionButton
              type="submit"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ffd60a] hover:bg-[#e6c200] text-black font-bold border border-[#ffd60a] cursor-pointer"
            >
              <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
                Confirm Password
              </span>
            </MainHeaderActionButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}