import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function AccountDetails({ isOpen, onClose, onConfirm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-8) + "@2026";
    setPassword(generated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) onConfirm({ username, password });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      {/* 
        [&_button:has(svg)]:hidden -> Yeh CSS rule container ke andar agar parent se
        inject hua koi bhi close button/cross icon hoga usko forcibly hide kar dega.
      */}
      <div className="w-full max-w-[440px] bg-[#121215] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col text-white relative [&_button.absolute]:hidden">
        
        {/* Header */}
        <div className="pb-3 mb-3 border-b border-[#27272a]/60">
          <h2 className="text-[13px] font-bold tracking-wide">
            Account Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-[10.5px]">
          {/* Username */}
          <div className="w-full">
            <label className="block text-[#71717a] mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#18181c] border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a]"
            />
          </div>

          {/* Password */}
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
                className="w-full bg-[#18181c] border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="p-2 rounded-xl border border-[#ffd60a]/40 bg-transparent text-[#ffd60a] hover:bg-[#ffd60a]/10 transition-colors cursor-pointer shrink-0"
                title="Generate Password"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]/60">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-[11px] font-semibold bg-[#27272a]/70 hover:bg-[#27272a] text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
            >
              Confirm Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}