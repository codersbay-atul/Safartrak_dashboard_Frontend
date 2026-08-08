
import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="w-full max-w-[420px] bg-[#121215] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col text-white relative [&_button.absolute]:hidden">
        <div className="pb-2.5 mb-2.5 border-b border-[#27272a]/60">
          <h2 className="text-[12px] font-bold tracking-wide">
            Account Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10px]">
          <div className="w-full">
            <label className="block text-[#71717a] mb-1 font-medium">
              Username
            </label>
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
              className="w-full bg-[#18181c] border border-[#27272a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a]"
            />
            {errors.username && (
              <p className="mt-1 text-[10px] text-red-400">{errors.username}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-[#71717a] mb-1 font-medium">
              Temporary Password
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                placeholder="Generate Secure Password"
                value={password}
                className="w-full bg-[#18181c] border border-[#27272a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="p-1.5 rounded-xl border border-[#ffd60a]/40 bg-transparent text-[#ffd60a] hover:bg-[#ffd60a]/10 transition-colors cursor-pointer shrink-0"
                title="Generate Password"
              >
                <RefreshCw size={13} />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[10px] text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 mt-1 border-t border-[#27272a]/60">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl text-[10.5px] font-semibold bg-[#27272a]/70 hover:bg-[#27272a] text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-xl text-[10.5px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
            >
              Confirm Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}