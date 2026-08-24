import React from "react";
import { Check } from "lucide-react";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[480px] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col font-sans overflow-hidden"
      >
        {/* Inner Card Container */}
        <div className="bg-[#18181b]/50 border border-[#27272a] rounded-2xl p-6 flex flex-col items-center text-center my-1">
          {/* Green Check Circle */}
          <div className="w-10 h-10 rounded-full bg-[#166534]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] mb-3">
            <Check size={20} strokeWidth={3} />
          </div>

          {/* 14px Title */}
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight mb-2 block text-[15px]"
          >
            Vehicle Added Successfully
          </MainLayoutColor>

          {/* 12px Description */}
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed max-w-[340px] block"
          >
            <span className="text-white font-medium">{vehicleNumber}</span> has
            been added to the{" "}
            <span className="text-white font-medium">{fleetName}</span>. GPS
            tracking is Inactive and the vehicle is ready for assignment.
          </MainLayoutColor>
        </div>

        {/* Action Buttons using headerButtonText */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#1d1d20] mt-1 shrink-0">
          <MainLayoutButton
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-full justify-center py-2"
          >
            <MainLayoutTextSize size="headerButtonText">
              Back to Vehicle List
            </MainLayoutTextSize>
          </MainLayoutButton>

          <MainLayoutButton
            type="button"
            variant="primary"
            onClick={onViewVehicle || onClose}
            className="w-full justify-center py-2"
          >
            <MainLayoutTextSize size="headerButtonText">
              View Vehicle
            </MainLayoutTextSize>
          </MainLayoutButton>
        </div>
      </MainLayoutColor>
    </div>
  );
}