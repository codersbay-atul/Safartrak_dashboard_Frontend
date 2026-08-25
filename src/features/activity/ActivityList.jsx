import React from "react";
import { SlidersHorizontal, MapPin, User, Truck } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";

function EventMeta({ event }) {
  if (!event.meta) return null;

  if (event.severity === "alert" && event.meta.alert) {
    return (
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="expiredStatusBadge"
        size="subInfoText"
        className="mt-1 font-medium leading-snug block"
      >
        {event.meta.alert}: {event.meta.speed} (Allowed {event.meta.allowed})
      </MainLayoutColor>
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
      border="cardBorder"
      className="w-full h-auto lg:h-full border rounded-xl flex flex-col overflow-hidden select-none font-sans"
    >
      {/* Header Controls */}
      <MainLayoutColor
        as="div"
        border="cardBorder"
        className="shrink-0 px-3 pt-3 pb-2.5 border-b"
      >
        <div className="flex items-center justify-between gap-2 mb-2.5">
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
          {/* Centralized Search Input */}
          <div className="flex-1 min-w-0">
            <MainSearchInput
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search routes..."
              iconPosition="left"
              className="w-full rounded-lg py-1 px-2.5"
            />
          </div>

          {/* Filter Trigger Button */}
          <MainLayoutFilterButton
            onClick={onFilterClick}
            aria-label="Filter activity"
            className="shrink-0 !px-2.5 !py-1.5"
          >
            <SlidersHorizontal size={14} className="shrink-0" />
          </MainLayoutFilterButton>
        </div>
      </MainLayoutColor>

      {/* Activity Timeline Content */}
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
            <MainLayoutColor
              as="div"
              border="cardBorder"
              className="absolute left-[54px] top-2 bottom-2 w-px border-l border-dashed"
            />

            <div className="flex flex-col gap-0">
              {events.map((event) => {
                const isSelected = selectedId === event.id;
                const isAlert = event.severity === "alert";

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect?.(event)}
                    className="relative w-full text-left flex gap-2.5 pb-4 last:pb-0 group cursor-pointer"
                  >
                    {/* Timestamp */}
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="w-[44px] shrink-0 font-medium pt-0.5 tabular-nums"
                    >
                      {event.time}
                    </MainLayoutColor>

                    {/* Dot Indicator */}
                    <span className="relative z-10 mt-1.5 shrink-0 flex items-center justify-center">
                      <MainLayoutColor
                        as="span"
                        background={
                          isAlert
                            ? "expiredStatusBadge"
                            : isSelected
                            ? "yellow"
                            : "filterBg"
                        }
                        border={
                          isAlert
                            ? "expiredStatusBadgeBorder"
                            : isSelected
                            ? "yellow"
                            : "filterBorder"
                        }
                        className="w-2.5 h-2.5 rounded-full border-2 transition-colors"
                      />
                    </span>

                    {/* Card Content */}
                    <MainLayoutColor
                      as="div"
                      background={
                        isSelected
                          ? "selectedRowBg"
                          : isAlert
                          ? "expiredStatusBadgeBg"
                          : "transparent"
                      }
                      border={
                        isSelected
                          ? "cardBorderHover"
                          : isAlert
                          ? "expiredStatusBadgeBorder"
                          : "cardBorder"
                      }
                      className="flex-1 min-w-0 rounded-lg border px-2.5 py-2 transition-all hover:opacity-90"
                    >
                      {/* Event Title */}
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color={isAlert ? "expiredStatusBadge" : "title"}
                        size="sectionTitle"
                        className="font-bold tracking-tight leading-tight block"
                      >
                        {event.title}
                      </MainLayoutColor>

                      {/* Sub Info Details */}
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        <div className="inline-flex items-center gap-1">
                          <MainLayoutColor as={MapPin} color="subtitle" size={11} className="shrink-0" />
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
                          <MainLayoutColor as={User} color="subtitle" size={11} className="shrink-0" />
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
                          <MainLayoutColor as={Truck} color="subtitle" size={11} className="shrink-0" />
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
                    </MainLayoutColor>
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