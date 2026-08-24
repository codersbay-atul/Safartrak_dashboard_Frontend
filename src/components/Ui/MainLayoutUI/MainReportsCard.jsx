import React from "react";
import { ArrowRight, Truck } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainReportCard({
  title,
  description,
  icon: Icon = Truck,
  actionLabel = "Generate Report",
  onClick,
  className = "",
}) {
  return (
    <MainLayoutColor
      as="button"
      background="surface"
      border="cardBorder"
      borderHover="cardBorderHover"
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col text-left w-full border rounded-xl p-3.5 sm:p-4 shadow-lg select-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBB24]/50 ${className}`}
    >
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#FDBB24] shrink-0 shadow-sm shadow-[#FDBB24]/20">
        <Icon size={15} strokeWidth={2.25} className="text-[#121214]" />
      </div>

      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="mt-3 font-bold tracking-tight leading-tight block"
      >
        {title}
      </MainLayoutColor>

      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="mt-1.5 leading-relaxed line-clamp-2 min-h-[2.5rem] block"
      >
        {description}
      </MainLayoutColor>

      <div className="mt-auto pt-3.5 flex items-center justify-between gap-2 w-full">
        <MainLayoutColor
          as="span"
          color="kpiTitle"
          className="text-[13px] font-medium"
        >
          {actionLabel}
        </MainLayoutColor>

        <ArrowRight
          size={14}
          strokeWidth={2.25}
          className="text-[#9D6F00] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>
    </MainLayoutColor>
  );
}