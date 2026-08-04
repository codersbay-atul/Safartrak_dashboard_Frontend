import React from "react";
import { Plus } from "lucide-react";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function AoiHeader({ onCreateClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Area of Interest (AOI)
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Create and manage geographical areas for fleet monitoring.
        </p>
      </div>

      <HeaderActionButton
        icon={Plus}
        onClick={onCreateClick}
        className="min-w-[120px]"
      >
        Create AOI
      </HeaderActionButton>
    </div>
  );
}
