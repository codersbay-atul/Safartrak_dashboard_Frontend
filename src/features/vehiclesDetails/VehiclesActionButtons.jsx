import React from "react";
import { Eye, Edit, Wrench, Trash2 } from "lucide-react";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function VehiclesActionButtons({
  onTrackLive,
  onEditVehicle,
  onScheduleMaintenance,
  onRemoveVehicle,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full select-none font-sans">
      {/* Track Live */}
      <MainHeaderActionButton
        type="button"
        variant="secondary"
        onClick={onTrackLive}
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        className="w-full py-2.5 px-3 gap-2 bg-[#18181b]/80 hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] rounded-xl text-white font-medium cursor-pointer transition-all"
      >
        <div className="flex items-center justify-center gap-2 w-full">
          <Eye className="w-4 h-4 text-[#ffd60a] shrink-0" />
          <span className="text-[14px] text-white font-medium whitespace-nowrap leading-none">Track Live</span>
        </div>
      </MainHeaderActionButton>

      {/* Edit Vehicle */}
      <MainHeaderActionButton
        type="button"
        variant="secondary"
        onClick={onEditVehicle}
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        className="w-full py-2.5 px-3 gap-2 bg-[#18181b]/80 hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] rounded-xl text-white font-medium cursor-pointer transition-all"
      >
        <div className="flex items-center justify-center gap-2 w-full">
          <Edit className="w-4 h-4 text-[#a1a1aa] shrink-0" />
          <span className="text-[14px] text-white font-medium whitespace-nowrap leading-none">Edit Vehicle</span>
        </div>
      </MainHeaderActionButton>

      {/* Schedule Maintenance */}
      <MainHeaderActionButton
        type="button"
        variant="secondary"
        onClick={onScheduleMaintenance}
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        className="w-full py-2.5 px-3 gap-2 bg-[#18181b]/80 hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] rounded-xl text-white font-medium cursor-pointer transition-all"
      >
        <div className="flex items-center justify-center gap-2 w-full">
          <Wrench className="w-4 h-4 text-[#ffd60a] shrink-0" />
          <span className="text-[14px] text-white font-medium whitespace-nowrap leading-none">Schedule Maintenance</span>
        </div>
      </MainHeaderActionButton>

      {/* Remove Vehicle */}
      <MainHeaderActionButton
        type="button"
        variant="danger"
        onClick={onRemoveVehicle}
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        className="w-full py-2.5 px-3 gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-500 rounded-xl font-medium cursor-pointer transition-all"
      >
        <div className="flex items-center justify-center gap-2 w-full">
          <Trash2 className="w-4 h-4 shrink-0" />
          <span className="text-[14px] font-medium whitespace-nowrap leading-none">Remove Vehicle</span>
        </div>
      </MainHeaderActionButton>
    </div>
  );
}