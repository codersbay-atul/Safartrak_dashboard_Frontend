import React from "react";
import { Search, SlidersHorizontal, MapPin, User, Truck } from "lucide-react";

function EventMeta({ event }) {
  if (!event.meta) return null;

  if (event.severity === "alert" && event.meta.alert) {
    return (
      <p className="mt-1 text-[9.5px] text-[#f87171] font-medium leading-snug">
        {event.meta.alert}: {event.meta.speed} (Allowed {event.meta.allowed})
      </p>
    );
  }

  if (event.meta.duration) {
    return (
      <p className="mt-1 text-[9.5px] text-[#a1a1aa] leading-snug">
        Duration {event.meta.duration}
        {event.meta.fuel ? ` · Fuel ${event.meta.fuel}` : ""}
      </p>
    );
  }

  if (event.meta.distance) {
    return (
      <p className="mt-1 text-[9.5px] text-[#a1a1aa] leading-snug">
        Distance {event.meta.distance}
      </p>
    );
  }

  return null;
}

export default function ActivityList({
  events = [],
  selectedId,
  onSelect,
  searchQuery = "",
  onSearchChange,
  onFilterClick,
}) {
  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none">
      <div className="shrink-0 px-3 pt-3 pb-2.5 border-b border-[#1f1f23]">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h3 className="text-[12.5px] font-bold text-white tracking-tight">
            Activity List
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative flex-1 min-w-0">
            <Search
              size={11}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search routes..."
              className="w-full pl-7 pr-2.5 py-1.5 text-[10px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
            />
          </div>
          <button
            type="button"
            onClick={onFilterClick}
            aria-label="Filter activity"
            className="shrink-0 p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 py-3">
        {events.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-[10.5px] text-[#71717a]">No activity found</p>
          </div>
        ) : (
          <div className="relative pl-1">
            <div className="absolute left-[52px] top-2 bottom-2 w-px border-l border-dashed border-[#2a2a2e]" />

            <div className="flex flex-col gap-0">
              {events.map((event, index) => {
                const isSelected = selectedId === event.id;
                const isAlert = event.severity === "alert";
                const isLast = index === events.length - 1;

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect?.(event)}
                    className={`relative w-full text-left flex gap-2.5 pb-4 last:pb-0 group cursor-pointer ${
                      isLast ? "" : ""
                    }`}
                  >
                    <span className="w-[42px] shrink-0 text-[9px] text-[#71717a] font-medium pt-0.5 tabular-nums">
                      {event.time}
                    </span>

                    <span className="relative z-10 mt-1.5 shrink-0 flex items-center justify-center">
                      <span
                        className={`w-2.5 h-2.5 rounded-full border-2 ${
                          isAlert
                            ? "bg-[#ef4444] border-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.55)]"
                            : isSelected
                              ? "bg-[#FDBB24] border-[#FDBB24] shadow-[0_0_8px_rgba(253,187,36,0.45)]"
                              : "bg-[#121214] border-[#a1a1aa] group-hover:border-[#FDBB24]"
                        } transition-colors`}
                      />
                    </span>

                    <div
                      className={`flex-1 min-w-0 rounded-lg border px-2.5 py-2 transition-all ${
                        isSelected
                          ? "bg-[#18181b] border-[#FDBB24]/35"
                          : isAlert
                            ? "bg-[#1a1214] border-[#7f1d1d]/50 hover:border-[#ef4444]/40"
                            : "bg-transparent border-transparent hover:bg-[#16161a] hover:border-[#232329]"
                      }`}
                    >
                      <p
                        className={`text-[11px] font-bold tracking-tight leading-tight ${
                          isAlert ? "text-[#f87171]" : "text-white"
                        }`}
                      >
                        {event.title}
                      </p>

                      <div className="mt-1.5 flex flex-col gap-0.5">
                        <span className="inline-flex items-center gap-1 text-[9.5px] text-[#a1a1aa]">
                          <MapPin size={9} className="text-[#71717a] shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9.5px] text-[#a1a1aa]">
                          <User size={9} className="text-[#71717a] shrink-0" />
                          <span className="truncate">{event.driver}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9.5px] text-[#a1a1aa]">
                          <Truck size={9} className="text-[#71717a] shrink-0" />
                          <span className="truncate">{event.vehicle}</span>
                        </span>
                      </div>

                      <EventMeta event={event} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
