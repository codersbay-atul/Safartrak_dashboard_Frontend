import React from "react";
import { ALERT_TYPES } from "./alertsData";

export default function AlertTypeGrid({
  activeType = "all",
  onTypeSelect,
}) {
  return (
    <div className="w-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3 select-none shrink-0">
      <h3 className="text-[12px] font-bold text-white tracking-tight mb-2.5">
        Command History
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
        {ALERT_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                onTypeSelect?.(isActive ? "all" : type.id)
              }
              className={`relative flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 min-h-[72px] transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-[#FDBB24]/10 border-[#FDBB24]/40 text-white"
                    : "bg-[#16161a] border-[#232329] text-[#d4d4d8] hover:border-[#2e2e36] hover:bg-[#1a1a1f]"
                }`}
            >
              {type.count ? (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#ef4444] text-white text-[8px] font-bold flex items-center justify-center shadow">
                  {type.count}
                </span>
              ) : null}

              <Icon
                size={16}
                className={isActive ? "text-[#FDBB24]" : "text-[#a1a1aa]"}
              />
              <span className="text-[9px] font-medium text-center leading-tight line-clamp-2">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
