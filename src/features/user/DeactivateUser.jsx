import React from "react";
import { Trash2 } from "lucide-react";

export default function DeactivateUser({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 bg-black/80 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-[380px] bg-[#121215] border border-[#27272a] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        <div className="w-full bg-[#18181c]/60 border border-[#27272a]/80 rounded-xl p-5 mb-5 flex flex-col items-center">
          <div className="mb-3 text-[#38bdf8]">
            <Trash2 size={28} className="stroke-[1.75]" />
          </div>

          <h3 className="text-[13px] font-bold text-white tracking-wide mb-2">
            Are you sure you want to deactivate user?
          </h3>

          <p className="text-[10.5px] text-[#71717a] leading-relaxed">
            you wil sure you want to deactivate user? If you deactivate you
            won't be able to activate again.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-[11px] font-semibold bg-[#27272a]/70 hover:bg-[#27272a] text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 rounded-xl text-[11px] font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
