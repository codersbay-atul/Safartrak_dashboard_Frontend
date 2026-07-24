import React from "react";
import { ArrowUpRight, Truck } from "lucide-react";

export default function ReportCard({
  title,
  description,
  icon: Icon = Truck,
  actionLabel = "Generate Report",
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col text-left w-full bg-[#16161a] border border-[#232329] rounded-xl p-3.5 sm:p-4 shadow-lg select-none cursor-pointer transition-all duration-200 hover:border-[#FDBB24]/35 hover:bg-[#1a1a1f] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBB24]/50 ${className}`}
    >
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#FDBB24] shrink-0 shadow-sm shadow-[#FDBB24]/20">
        <Icon size={15} strokeWidth={2.25} className="text-[#121214]" />
      </div>

      <h3 className="mt-3 text-[12.5px] sm:text-[13px] font-bold text-white tracking-tight leading-tight">
        {title}
      </h3>

      <p className="mt-1.5 text-[10px] sm:text-[10.5px] text-[#a1a1aa] leading-relaxed line-clamp-2 min-h-[2.5rem]">
        {description}
      </p>

      <div className="mt-auto pt-3.5 flex items-center justify-between gap-2">
        <span className="text-[10.5px] sm:text-[11px] font-semibold text-[#FDBB24] group-hover:text-[#E9AE17] transition-colors">
          {actionLabel}
        </span>
        <ArrowUpRight
          size={14}
          strokeWidth={2.25}
          className="text-[#FDBB24] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </button>
  );
}
