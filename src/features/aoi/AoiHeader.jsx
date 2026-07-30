import React from "react";
import { Plus } from "lucide-react";
import Button from "../../components/Ui/Button";

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

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        iconPosition="left"
        onClick={onCreateClick}
       className="!w-[150px] min-w-[150px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Create AOI
      </Button>
    </div>
  );
}
