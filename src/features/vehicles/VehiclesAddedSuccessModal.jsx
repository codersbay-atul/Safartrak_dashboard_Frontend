import React from "react";
import { Check } from "lucide-react";

export default function VehicleAddedSuccessModal({
  isOpen,
  onClose,
  vehicleNumber = "MH14ZZ8765",
  fleetName = "West Fleet",
  onViewVehicle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Inner Card Container */}
        <div className="bg-[#18181b]/50 border border-[#27272a] rounded-2xl p-6 flex flex-col items-center text-center my-1">
          {/* Green Check Circle */}
          <div className="w-10 h-10 rounded-full bg-[#166534]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] mb-3">
            <Check size={20} strokeWidth={3} />
          </div>

          <h3 className="text-[15px] font-bold text-white mb-2">
            Vehicle Added Successfully
          </h3>

          <p className="text-[11px] text-[#a1a1aa] leading-relaxed max-w-[340px]">
            <span className="text-white font-medium">{vehicleNumber}</span> has been added to the{" "}
            <span className="text-white font-medium">{fleetName}</span>. GPS tracking is active and the vehicle is ready for assignment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#1d1d20] mt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer"
          >
            Back to Vehicle List
          </button>
          <button
            type="button"
            onClick={onViewVehicle || onClose}
            className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
          >
            View Vehicle
          </button>
        </div>

      </div>
    </div>
  );
}