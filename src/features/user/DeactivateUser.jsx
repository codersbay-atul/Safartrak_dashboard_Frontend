import React from "react";
import { Trash2 } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function DeactivateUser({ isOpen, onClose, onConfirm, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans animate-fadeIn">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[400px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center"
      >
        {/* Warning Icon & Text Box */}
        <MainLayoutColor
          as="div"
          background="surface"
          className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl p-5 mb-4 flex flex-col items-center"
        >
          <div className="mb-3 text-rose-400">
            <Trash2 size={28} className="stroke-[1.75]" />
          </div>

          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide mb-2 block text-[14px]"
          >
            Are you sure you want to deactivate user?
          </MainLayoutColor>

          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed block text-[12px]"
          >
            This action will deactivate the selected account. It cannot be undone from this screen.
          </MainLayoutColor>
        </MainLayoutColor>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
          <MainHeaderActionButton
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none">
              Cancel
            </span>
          </MainHeaderActionButton>

          <MainHeaderActionButton
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium border border-rose-600 cursor-pointer disabled:opacity-60 transition-all shadow-md shadow-rose-950/40"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none text-white">
              {isLoading ? "Deactivating..." : "Confirm"}
            </span>
          </MainHeaderActionButton>
        </div>
      </MainLayoutColor>
    </div>
  );
}