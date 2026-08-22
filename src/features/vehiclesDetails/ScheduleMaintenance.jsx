import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

const MAINTENANCE_TYPE_OPTIONS = [
  { label: "Preventive Maintenance", value: "Preventive" },
  { label: "Breakdown Repair", value: "Breakdown" },
  { label: "Routine Inspection", value: "Inspection" },
];

const DURATION_OPTIONS = [
  { label: "2 Hours", value: "2 Hours" },
  { label: "4 Hours", value: "4 Hours" },
  { label: "1 Day", value: "1 Day" },
];

export default function ScheduleMaintenance({
  onClose,
  onCancel,
  onNext,
  onSaved,
  uniqueId,
  selectedVehicle,
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [maintData, setMaintData] = useState({
    maintenanceType: "",
    serviceDate: "",
    serviceTime: "",
    duration: "",
    additionalNote:
      "Regular preventive service including engine check, oil change, filter replacement and brake inspection.",
    notifyDriver: false,
    notifyFleetManager: false,
    sendEmailReminder: false,
    priority: "Medium",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!maintData.maintenanceType?.trim()) {
      newErrors.maintenanceType = "Maintenance type is required";
    }

    if (!maintData.serviceDate) {
      newErrors.serviceDate = "Service date is required";
    }

    if (!maintData.serviceTime) {
      newErrors.serviceTime = "Service time is required";
    }

    if (!maintData.duration?.trim()) {
      newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (onClose) onClose();
    else if (onCancel) onCancel();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      setIsSubmitting(true);
      if (onSaved) onSaved();
      setIsSuccess(true);

      setTimeout(() => {
        if (onNext) onNext(maintData);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to schedule maintenance", error);
      toast.error(error?.message || "Failed to schedule maintenance");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full max-w-[380px] border border-[#27272a] rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center space-y-3 select-none font-sans"
      >
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
        </div>

        <div className="space-y-1">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block text-[15px]"
          >
            Maintenance Scheduled Successfully!
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block"
          >
            Your request has been recorded into the timeline.
          </MainLayoutColor>
        </div>

        <div className="w-full bg-[#18181b]/70 border border-[#27272a] rounded-xl p-3 text-left space-y-1.5 mt-2">
          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
              Type:
            </MainLayoutColor>
            <span className="text-white text-[12px] font-medium">
              {maintData.maintenanceType || "Preventive Maintenance"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
              Priority:
            </MainLayoutColor>
            <span className="text-[#ffd60a] text-[12px] font-medium">
              {maintData.priority}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
              Date & Time:
            </MainLayoutColor>
            <span className="text-white text-[12px] font-medium">
              {maintData.serviceDate || "Today"} • {maintData.serviceTime || "Now"}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-[#71717a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a] animate-ping" />
          Closing automatically...
        </div>
      </MainLayoutColor>
    );
  }

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full max-w-[480px] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col max-h-[85vh] overflow-visible select-none font-sans"
    >
      {/* Header (14px Section Title) */}
      <div className="pb-3 mb-2 border-b border-[#27272a] shrink-0">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block text-[14px]"
        >
          Schedule Maintenance
        </MainLayoutColor>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col min-h-0 text-[11px]"
      >
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 custom-scrollbar">
          {/* Maintenance Type */}
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Maintenance Type <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Maintenance Type"
              options={MAINTENANCE_TYPE_OPTIONS}
              selectedValue={maintData.maintenanceType}
              onSelect={(val) => {
                setMaintData((p) => ({ ...p, maintenanceType: val }));
                if (errors.maintenanceType) setErrors((p) => ({ ...p, maintenanceType: "" }));
              }}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.maintenanceType ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-2 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.maintenanceType && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.maintenanceType}
              </p>
            )}
          </div>

          {/* Service Date & Service Time */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium text-[12px]"
              >
                Service Date <span className="text-rose-500">*</span>
              </MainLayoutColor>
              <input
                type="date"
                value={maintData.serviceDate}
                onChange={(e) => {
                  setMaintData({ ...maintData, serviceDate: e.target.value });
                  if (errors.serviceDate) setErrors((p) => ({ ...p, serviceDate: "" }));
                }}
                className={`w-full bg-[#18181b]/60 border ${
                  errors.serviceDate ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
                } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium focus:outline-none transition-all [color-scheme:dark] placeholder-[#A8A8A8]`}
              />
              {errors.serviceDate && (
                <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                  {errors.serviceDate}
                </p>
              )}
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium text-[12px]"
              >
                Service Time <span className="text-rose-500">*</span>
              </MainLayoutColor>
              <input
                type="time"
                value={maintData.serviceTime}
                onChange={(e) => {
                  setMaintData({ ...maintData, serviceTime: e.target.value });
                  if (errors.serviceTime) setErrors((p) => ({ ...p, serviceTime: "" }));
                }}
                className={`w-full bg-[#18181b]/60 border ${
                  errors.serviceTime ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
                } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium focus:outline-none transition-all [color-scheme:dark] placeholder-[#A8A8A8]`}
              />
              {errors.serviceTime && (
                <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                  {errors.serviceTime}
                </p>
              )}
            </div>
          </div>

          {/* Estimated Duration */}
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Estimated Duration <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Duration"
              options={DURATION_OPTIONS}
              selectedValue={maintData.duration}
              onSelect={(val) => {
                setMaintData((p) => ({ ...p, duration: val }));
                if (errors.duration) setErrors((p) => ({ ...p, duration: "" }));
              }}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.duration ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-2 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.duration && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.duration}
              </p>
            )}
          </div>

          {/* Priority Level */}
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Priority Level
            </MainLayoutColor>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setMaintData((prev) => ({ ...prev, priority: p }))}
                  className={`py-2 rounded-xl border text-[12px] font-medium transition-all cursor-pointer ${
                    maintData.priority === p
                      ? "bg-[#ffd60a]/10 border-[#ffd60a] text-[#ffd60a]"
                      : "bg-[#18181b]/60 border-[#27272a] text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-2 pt-1">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block font-medium text-[12px]"
            >
              Notifications
            </MainLayoutColor>
            <div className="flex items-center justify-between text-[#d4d4d8]">
              <span className="text-[12px]">Notify Driver</span>
              <input
                type="checkbox"
                checked={maintData.notifyDriver}
                onChange={(e) =>
                  setMaintData({ ...maintData, notifyDriver: e.target.checked })
                }
                className="accent-[#ffd60a] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-[#d4d4d8]">
              <span className="text-[12px]">Notify Fleet Manager</span>
              <input
                type="checkbox"
                checked={maintData.notifyFleetManager}
                onChange={(e) =>
                  setMaintData({
                    ...maintData,
                    notifyFleetManager: e.target.checked,
                  })
                }
                className="accent-[#ffd60a] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-[#d4d4d8]">
              <span className="text-[12px]">Send Email Reminder</span>
              <input
                type="checkbox"
                checked={maintData.sendEmailReminder}
                onChange={(e) =>
                  setMaintData({
                    ...maintData,
                    sendEmailReminder: e.target.checked,
                  })
                }
                className="accent-[#ffd60a] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Additional Note */}
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Additional Note
            </MainLayoutColor>
            <textarea
              rows={2}
              value={maintData.additionalNote}
              onChange={(e) =>
                setMaintData({ ...maintData, additionalNote: e.target.value })
              }
              placeholder="Add maintenance notes here..."
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[var(--color-yellow,#ffd60a)] rounded-xl p-2.5 text-white text-[12px] placeholder-[#A8A8A8] font-medium focus:outline-none resize-none transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2.5 mt-2 border-t border-[#27272a] shrink-0">
          <MainHeaderActionButton
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none">
              Cancel
            </span>
          </MainHeaderActionButton>

          <MainHeaderActionButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2.5 rounded-xl text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[#e6c200] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-50 shadow-md shadow-[var(--color-yellow,#ffd60a)]/10"
          >
            <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
              {isSubmitting ? "Scheduling..." : "Schedule"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}