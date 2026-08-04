import React from "react";
import { Trash2 } from "lucide-react";

function DeleteConfirmationModal({
  isOpen = true,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-[340px] bg-[#161619] border border-[#232328] rounded-2xl p-3.5 shadow-2xl flex flex-col gap-3 text-zinc-100 font-sans">
        <div className="bg-[#111113] border border-[#222226] rounded-xl px-4 py-5 flex flex-col items-center justify-center text-center">
          <div className="mb-2.5 text-sky-400">
            <Trash2 size={28} strokeWidth={2} />
          </div>

          <h3 className="text-base font-bold text-white mb-1.5">
            Are you sure ?
          </h3>

          <p className="text-xs text-zinc-400 font-normal leading-relaxed max-w-[220px]">
            you wil not be ale to access this information once you confirm.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 rounded-xl bg-[#25252a] hover:bg-[#2e2e34] text-zinc-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-1/2 py-2 rounded-xl bg-[#e12626] hover:bg-[#c81e1e] text-white font-semibold text-xs transition-colors cursor-pointer shadow-lg shadow-red-600/20"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;