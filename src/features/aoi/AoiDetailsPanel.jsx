import React, { useState } from "react";
import Button from "../../components/Ui/Button";

const TABS = ["Overview", "Vehicle", "Alerts", "Activity"];

export default function AoiDetailsPanel({ aoi, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!aoi) {
    return (
      <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-4 flex items-center justify-center select-none">
        <p className="text-[11px] text-[#71717a]">Select an AOI to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col select-none overflow-hidden">
      <div className="shrink-0 mb-2.5">
        <h3 className="text-[13px] font-bold text-white tracking-tight truncate">
          {aoi.name}
        </h3>
        <p className="text-[9px] text-zinc-500 mt-0.5">
          Created {aoi.createdAt}
        </p>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto mb-3 shrink-0 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-semibold transition-all shrink-0 cursor-pointer border
              ${
                activeTab === tab
                  ? "bg-[#FDBB24]/15 border-[#FDBB24]/40 text-[#FDBB24]"
                  : "bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-0.5">
        {activeTab === "Overview" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-[#1f1f23] bg-[#161619]/50 p-2.5 space-y-2">
              <p className="text-[10px] font-bold text-white">AOI Information</p>
              <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                <div>
                  <p className="text-zinc-500">Type</p>
                  <p className="text-white font-semibold mt-0.5">{aoi.type}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Size</p>
                  <p className="text-white font-semibold mt-0.5">{aoi.size}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Created By</p>
                  <p className="text-white font-semibold mt-0.5">{aoi.createdBy}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Status</p>
                  <p
                    className={`font-semibold mt-0.5 ${
                      aoi.status === "active"
                        ? "text-[#10b981]"
                        : "text-[#FDBB24]"
                    }`}
                  >
                    {aoi.status === "active" ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#1f1f23] bg-[#161619]/50 p-2.5">
              <p className="text-[10px] font-bold text-white mb-2">
                Vehicle Status
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Inside", value: aoi.inside, color: "text-[#10b981]" },
                  {
                    label: "Entered",
                    value: aoi.enteredToday,
                    color: "text-[#FDBB24]",
                  },
                  {
                    label: "Exited",
                    value: aoi.exitedToday,
                    color: "text-[#ef4444]",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-md bg-[#121214] border border-[#1f1f23] px-2 py-1.5 text-center"
                  >
                    <p className={`text-[13px] font-bold ${item.color}`}>
                      {item.value}
                    </p>
                    <p className="text-[8px] text-zinc-500 mt-0.5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#1f1f23] bg-[#161619]/50 p-2.5">
              <p className="text-[10px] font-bold text-white mb-2">
                Assigned Vehicles
              </p>
              <div className="flex flex-col gap-1.5">
                {aoi.assignedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.plate}
                    className="flex items-center justify-between rounded-md bg-[#121214] border border-[#1f1f23] px-2 py-1.5"
                  >
                    <span className="text-[10px] font-semibold text-white">
                      {vehicle.plate}
                    </span>
                    <span
                      className={`text-[9px] font-bold ${
                        vehicle.status === "Inside"
                          ? "text-[#10b981]"
                          : "text-[#ef4444]"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Vehicle" && (
          <div className="flex flex-col gap-1.5">
            {aoi.assignedVehicles.map((vehicle) => (
              <div
                key={vehicle.plate}
                className="flex items-center justify-between rounded-lg border border-[#1f1f23] bg-[#161619]/50 px-2.5 py-2"
              >
                <span className="text-[10.5px] font-semibold text-white">
                  {vehicle.plate}
                </span>
                <span
                  className={`text-[9px] font-bold ${
                    vehicle.status === "Inside"
                      ? "text-[#10b981]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Alerts" && (
          <div className="rounded-lg border border-dashed border-[#27272a] px-3 py-8 text-center">
            <p className="text-[11px] text-[#71717a]">
              {aoi.enteredToday + aoi.exitedToday} entry/exit events today
            </p>
          </div>
        )}

        {activeTab === "Activity" && (
          <div className="rounded-lg border border-dashed border-[#27272a] px-3 py-8 text-center">
            <p className="text-[11px] text-[#71717a]">
              Recent AOI activity will appear here
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 pt-3 mt-2 border-t border-[#1f1f23] flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="flex-1 rounded-md"
        >
          Edit AOI
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          className="flex-1 rounded-md"
        >
          Delete AOI
        </Button>
      </div>
    </div>
  );
}
