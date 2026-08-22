import React, { useState } from "react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[440px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="pb-3 mb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Invite User
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="mt-1 max-w-xl block text-[12px]"
          >
            Send an invite link to a new team member and let them join your account.
          </MainLayoutColor>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="w-full">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block mb-1 font-medium text-[12px]"
            >
              Email Address
            </MainLayoutColor>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]">
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
                Send Invite
              </span>
            </MainHeaderActionButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}