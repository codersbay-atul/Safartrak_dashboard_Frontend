import React from "react";
import { Square, Navigation } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

function DurationPill({ children }) {
  if (!children) return null;

  return (
    <MainLayoutColor
      as="span"
      background="filterActiveBg"
      color="title"
      className="inline-flex items-center px-2 py-0.5 rounded-md shrink-0"
    >
      <MainLayoutTextSize size="captionText" className="font-medium">
        {children}
      </MainLayoutTextSize>
    </MainLayoutColor>
  );
}

export default function RouteHistoryTimeline({
  events = [],
  onSaveStop,
  onSelectStop,
  selectedStopId,
  vehicle,
}) {
  if (!events.length) return null;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2 bottom-2 w-px -translate-x-1/2"
        style={{
          left: "8px",
          backgroundImage:
            "repeating-linear-gradient(to bottom, #71717a 0 6px, transparent 6px 10px)",
        }}
      />
      <div className="flex flex-col gap-7">
        {events.map((event) => {
          const isStop = event.kind === "stop";
          const stopLabel = event.title || `Stop ${event.stopNumber ?? ""}`;
          const isSelected = isStop && selectedStopId === event.id;

          return (
            <div
              key={event.id}
              className={`relative flex gap-2.5 ${
                isStop ? "cursor-pointer rounded-lg -mx-1 px-1 py-1" : ""
              } ${isSelected ? "bg-[#1a1a1d]" : ""}`}
              onClick={
                isStop
                  ? () => onSelectStop?.(event, vehicle)
                  : undefined
              }
            >
              <span className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-[#141414]">
                {isStop ? (
                  <Square size={16} className="text-[#ef4444]" fill="#ef4444" />
                ) : (
                  <Navigation
                    size={16}
                    className="text-[#22c55e]"
                    fill="#22c55e"
                  />
                )}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="subInfoText"
                      className={`font-semibold ${
                        isStop ? "text-[#ef4444]" : "text-[#22c55e]"
                      }`}
                    >
                      {isStop ? stopLabel : "Ran for"}
                    </MainLayoutColor>
                    <DurationPill>{event.duration}</DurationPill>
                  </div>

                </div>

                {isStop ? (
                  event.address && event.address !== "Not Available" ? (
                    <>
                    <div className="flex items-center justify-between gap-2">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="subInfoText"
                      className="mt-2 block leading-[1.5] font-normal break-words min-h-[3.6em] max-h-[3.6em]"
                    >
                      {event.address}
                    </MainLayoutColor>
                    {isStop ? (
                      <button
                        type="button"
                        onClick={(clickEvent) => {
                          clickEvent.stopPropagation();
                          onSaveStop?.(event, vehicle);
                        }}
                        className="shrink-0 h-7 px-2.5 rounded-lg bg-[#27272a] text-white hover:bg-[#3f3f46] cursor-pointer"
                      >
                        <MainLayoutTextSize size="captionText" className="font-medium">
                          + Save
                        </MainLayoutTextSize>
                      </button>
                    ) : null}
                    </div>
                    </>
                  ) : null
                ) : (
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="title"
                    size="subInfoText"
                    className="mt-2 block font-medium"
                  >
                    Covered {event.distance || "—"}
                  </MainLayoutColor>
                )}

                {event.timeRange ? (
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="muted"
                    size="captionText"
                    className="mt-1.5 block font-normal"
                  >
                    ({event.timeRange})
                  </MainLayoutColor>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
