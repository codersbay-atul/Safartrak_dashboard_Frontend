import React from "react";
import { Eye, Edit, Wrench, Trash2 } from "lucide-react";

export default function VehiclesActionButtons({
  onTrackLive,
  onEditVehicle,
  onScheduleMaintenance,
  onRemoveVehicle,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full select-none">
      
      {/* Track Live */}
      <button
        type="button"
        onClick={onTrackLive}
        className="bg-[#18181b]/80 hover:bg-[#27272a] text-[#d4d4d8] hover:text-white border border-[#27272a] hover:border-[#3f3f46] py-2 px-3 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
      >
        <Eye className="w-3.5 h-3.5 text-[#ffd60a] group-hover:scale-110 transition-transform" />
        <span>Track Live</span>
      </button>

      {/* Edit Vehicle */}
      <button
        type="button"
        onClick={onEditVehicle}
        className="bg-[#18181b]/80 hover:bg-[#27272a] text-[#d4d4d8] hover:text-white border border-[#27272a] hover:border-[#3f3f46] py-2 px-3 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
      >
        <Edit className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-white group-hover:scale-110 transition-transform" />
        <span>Edit Vehicle</span>
      </button>

      {/* Schedule Maintenance */}
      <button
        type="button"
        onClick={onScheduleMaintenance}
        className="bg-[#18181b]/80 hover:bg-[#27272a] text-[#d4d4d8] hover:text-white border border-[#27272a] hover:border-[#3f3f46] py-2 px-3 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
      >
        <Wrench className="w-3.5 h-3.5 text-[#ffd60a] group-hover:scale-110 transition-transform" />
        <span>Schedule Maintenance</span>
      </button>

      {/* Remove Vehicle */}
      <button
        type="button"
        onClick={onRemoveVehicle}
        className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-500 py-2 px-3 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
      >
        <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        <span>Remove Vehicle</span>
      </button>

    </div>
  );
}