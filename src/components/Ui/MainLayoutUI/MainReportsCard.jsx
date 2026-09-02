import React from "react";
import { ArrowRight, Truck } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

const COMING_SOON_TITLES = [
  "distance",
  "distance report",
  "ignition",
  "harsh barking",
  "harsh braking",
  "harsh acderation",
  "harsh acceleration",
  "towing",
  "sos",
  "sos report",
  "low battery",
  "power cut",
];

function normalizeTitle(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function titleKey(value) {
  return normalizeTitle(value).replace(/ report$/, "").trim();
}

function isNewReport(title) {
  const key = titleKey(title);
  const full = normalizeTitle(title);
  return key === "trip" || full === "trip report";
}

function isComingSoonReport(title) {
  const full = normalizeTitle(title);
  const key = titleKey(title);
  return COMING_SOON_TITLES.some(
    (item) => full === item || key === item || key.includes(item),
  );
}

export default function MainReportCard({
  title,
  description,
  icon: Icon = Truck,
  actionLabel = "Generate Report",
  onClick,
  className = "",
}) {
  const isComingSoon = isComingSoonReport(title);
  const isNew = isNewReport(title) && !isComingSoon;
  const interactiveProps = isComingSoon ? {} : { type: "button", onClick };

  const badge = isComingSoon ? (
    <span
      className="inline-flex items-center rounded-md border border-dashed border-[#A3A3A3] bg-[#0A0A0A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#C8C8C8] leading-none shrink-0 whitespace-nowrap"
      style={{ textShadow: "0 0 8px rgba(200, 200, 200, 0.4)" }}
    >
      Coming Soon
    </span>
  ) : isNew ? (
    <span className="inline-flex items-center rounded-full bg-[#22C55E] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white leading-none shrink-0">
      New
    </span>
  ) : null;

  return (
    <MainLayoutColor
      as={isComingSoon ? "div" : "button"}
      background="surface"
      border="cardBorder"
      borderHover={isComingSoon ? undefined : "cardBorderHover"}
      {...interactiveProps}
      className={`group relative flex flex-col text-left w-full h-full min-h-[168px] border rounded-xl p-4 shadow-lg select-none transition-all duration-200 ${
        isComingSoon
          ? "cursor-default"
          : "cursor-pointer hover:-translate-y-0.5 hover:border-[#FDBB24]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBB24]/50"
      } ${className}`}
    >
      <div className="flex items-start gap-2.5 w-full">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDBB24] shrink-0 shadow-sm shadow-[#FDBB24]/20">
          <Icon size={16} strokeWidth={2.25} className="text-[#121214]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="title"
              className="font-bold tracking-tight leading-snug block"
            >
              {title}
            </MainLayoutColor>
            {badge}
          </div>

          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subtitle"
            className="mt-1.5 leading-relaxed line-clamp-3 block"
          >
            {description}
          </MainLayoutColor>
        </div>
      </div>

      {!isComingSoon && (
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 w-full">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="yellow"
            size="headerButtonText"
            className="font-medium"
          >
            {actionLabel}
          </MainLayoutColor>

          <ArrowRight
            size={16}
            strokeWidth={2.25}
            className="text-[#FDB914] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      )}
    </MainLayoutColor>
  );
}
