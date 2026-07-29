import React, { useState } from "react";

export default function InviteUser({ isOpen, onClose, onSendInvite }) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendInvite) {
      onSendInvite(email.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#03050A]/70 backdrop-blur-xl select-none">
      <div className="relative w-full max-w-[440px] bg-[#121214]/95 border border-[#27272a] rounded-[28px] p-6 shadow-2xl flex flex-col text-white">
        <div className="pb-4 mb-4 border-b border-[#27272a]/70">
          <h2 className="text-[15px] font-bold tracking-wide">Invite User</h2>
          <p className="text-[11.5px] text-[#a1a1aa] mt-1 max-w-xl">
            Send an invite link to a new team member and let them join your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10.5px]">
          <div className="w-full">
            <label className="block text-[#8b8c94] mb-1 font-medium text-[11px]">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18181c]/85 border border-[#313236] rounded-2xl px-4 py-3 text-white placeholder-[#6b6e78] focus:outline-none focus:border-[#ffd60a] focus:ring-2 focus:ring-[#ffd60a]/15 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-3 mt-3 border-t border-[#27272a]/60">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl text-[11px] font-semibold bg-[#27272a]/75 hover:bg-[#313236] text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
