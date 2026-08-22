import React from "react";
import { Search, SlidersHorizontal, MapPin, User, Truck } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

function EventMeta({ event }) {
  if (!event.meta) return null;

  if (event.severity === "alert" && event.meta.alert) {
    return (
      <MainLayoutTextSize
        size="subInfoText"
        className="mt-1 text-[#f87171] font-medium leading-snug block"
      >
        {event.meta.alert}: {event.meta.speed} (Allowed {event.meta.allowed})
      </MainLayoutTextSize>
    );
  }

  if (event.meta.duration) {
    return (
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="mt-1 leading-snug block"
      >
        Duration {event.meta.duration}
        {event.meta.fuel ? ` · Fuel ${event.meta.fuel}` : ""}
      </MainLayoutColor>
    );
  }

  if (event.meta.distance) {
    return (
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="mt-1 leading-snug block"
      >
        Distance {event.meta.distance}
      </MainLayoutColor>
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
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-auto lg:h-full border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none font-sans"
    >
      <div className="shrink-0 px-3 pt-3 pb-2.5 border-b border-[#1f1f23]">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* 14px Header Title */}
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight block"
          >
            Activity List
          </MainLayoutColor>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative flex-1 min-w-0">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search routes..."
              className="w-full pl-7 pr-2.5 py-1.5 text-[12px] rounded-lg bg-[#18181b] border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all"
            />
          </div>
          <button
            type="button"
            onClick={onFilterClick}
            aria-label="Filter activity"
            className="shrink-0 p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="flex-none lg:flex-1 min-h-0 overflow-y-visible lg:overflow-y-auto custom-scrollbar px-3 py-3">
        {events.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              No activity found
            </MainLayoutColor>
          </div>
        ) : (
          <div className="relative pl-1">
            <div className="absolute left-[54px] top-2 bottom-2 w-px border-l border-dashed border-[#2a2a2e]" />

            <div className="flex flex-col gap-0">
              {events.map((event, index) => {
                const isSelected = selectedId === event.id;
                const isAlert = event.severity === "alert";

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect?.(event)}
                    className="relative w-full text-left flex gap-2.5 pb-4 last:pb-0 group cursor-pointer"
                  >
                    {/* 12px Timestamp */}
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="w-[44px] shrink-0 font-medium pt-0.5 tabular-nums"
                    >
                      {event.time}
                    </MainLayoutColor>

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
                      {/* 14px Event Title */}
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className={`font-bold tracking-tight leading-tight block ${
                          isAlert ? "text-[#f87171]" : ""
                        }`}
                      >
                        {event.title}
                      </MainLayoutColor>

                      {/* 12px Sub Info Details */}
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        <div className="inline-flex items-center gap-1">
                          <MapPin size={11} className="text-[#71717a] shrink-0" />
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="truncate"
                          >
                            {event.location}
                          </MainLayoutColor>
                        </div>
                        <div className="inline-flex items-center gap-1">
                          <User size={11} className="text-[#71717a] shrink-0" />
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="truncate"
                          >
                            {event.driver}
                          </MainLayoutColor>
                        </div>
                        <div className="inline-flex items-center gap-1">
                          <Truck size={11} className="text-[#71717a] shrink-0" />
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="truncate"
                          >
                            {event.vehicle}
                          </MainLayoutColor>
                        </div>
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
    </MainLayoutColor>
  );
}