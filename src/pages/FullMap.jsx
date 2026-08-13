import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LivePositions from "../features/dashboard/LivePositions";

export default function FullMap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const vehicleId = searchParams.get("vehicleId");
  const vehiclePlate = searchParams.get("plate");

  const selectedVehicle = vehicleId
    ? { id: vehicleId, plate: vehiclePlate || vehicleId }
    : null;

  return (
    <div className="w-screen h-screen bg-[#0c0c0e] flex flex-col overflow-hidden relative select-none">
      {/* Header with Filters */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-3 py-2 border-b border-[#1f1f23]/60 bg-[#121214]/95 z-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                window.close();
              }
            }}
            className="px-2.5 py-1.5 text-[11px] font-bold bg-[#18181b] hover:bg-[#27272a] text-white border border-[#27272a] rounded-lg shadow-md cursor-pointer transition-all flex items-center gap-1.5"
          >
            <span>&larr;</span>
            <span>Close</span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="flex flex-col">
            <label className="text-[9px] text-[#a1a1aa] font-semibold mb-0.5">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-8 px-2.5 text-[11px] bg-[#18181b] border border-[#27272a] rounded-lg text-white focus:border-[#FDBB24] focus:ring-1 focus:ring-[#FDBB24]/60 focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] text-[#a1a1aa] font-semibold mb-0.5">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-8 px-2.5 text-[11px] bg-[#18181b] border border-[#27272a] rounded-lg text-white focus:border-[#FDBB24] focus:ring-1 focus:ring-[#FDBB24]/60 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0">
        <LivePositions
          selectedVehicle={selectedVehicle}
          showRoutePath={true}
          openInNewTab={true}
          hideViewMapButton={true}
        />
      </div>
    </div>
  );
}