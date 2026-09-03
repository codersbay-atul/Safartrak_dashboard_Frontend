import React from "react";
import { Trash2 } from "lucide-react";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";

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
          <MainLayoutButton
            type="button"
            variant="outlineMuted"
            size="md"
            onClick={onClose}
            className="w-1/2"
          >
            Cancel
          </MainLayoutButton>
          <MainLayoutButton
            type="button"
            variant="solidYellow"
            size="md"
            onClick={onConfirm}
            className="w-1/2"
          >
            Confirm
          </MainLayoutButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;