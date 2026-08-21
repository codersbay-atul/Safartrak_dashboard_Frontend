import React, { useState } from "react";
import { CheckCircle2, Calendar, Clock, AlertCircle } from "lucide-react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";

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

export default function ScheduleMaintenance({ onClose, onCancel, onNext }) {
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

  const handleClose = () => {
    if (onClose) onClose();
    else if (onCancel) onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSuccess(true);

    setTimeout(() => {
      if (onNext) onNext(maintData);
      handleClose();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-[380px] bg-[#121214] border border-[#27272a] rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-200 select-none">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
        </div>

        <div className="space-y-1">
          <h2 className="text-[15px] font-bold text-white tracking-tight">
            Maintenance Scheduled Successfully!
          </h2>
          <p className="text-[11px] text-[#a1a1aa]">
            Your request has been recorded into the timeline.
          </p>
        </div>

        <div className="w-full bg-[#18181b]/70 border border-[#27272a] rounded-xl p-3 text-left text-[10.5px] space-y-1.5 mt-2">
          <div className="flex items-center justify-between text-[#a1a1aa]">
            <span>Type:</span>
            <span className="text-white font-medium">
              {maintData.maintenanceType || "Preventive Maintenance"}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#a1a1aa]">
            <span>Priority:</span>
            <span className="text-[#ffd60a] font-medium">
              {maintData.priority}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#a1a1aa]">
            <span>Date & Time:</span>
            <span className="text-white font-medium">
              {maintData.serviceDate || "Today"} •{" "}
              {maintData.serviceTime || "Now"}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[10px] text-[#71717a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a] animate-ping" />
          Closing automatically...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col max-h-[85vh] overflow-visible select-none">
      {/* Header */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60 shrink-0">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Schedule Maintenance
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col min-h-0 text-[10.5px]"
      >
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 custom-scrollbar">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Maintenance Type
            </label>
            <MainDropDown
              label="Select Maintenance Type"
              options={MAINTENANCE_TYPE_OPTIONS}
              selectedValue={maintData.maintenanceType}
              onSelect={(val) =>
                setMaintData((p) => ({ ...p, maintenanceType: val }))
              }
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">
                Service Date
              </label>
              <input
                type="date"
                value={maintData.serviceDate}
                onChange={(e) =>
                  setMaintData({ ...maintData, serviceDate: e.target.value })
                }
                className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white focus:outline-none [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">
                Service Time
              </label>
              <input
                type="time"
                value={maintData.serviceTime}
                onChange={(e) =>
                  setMaintData({ ...maintData, serviceTime: e.target.value })
                }
                className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Estimated Duration
            </label>
            <MainDropDown
              label="Select Duration"
              options={DURATION_OPTIONS}
              selectedValue={maintData.duration}
              onSelect={(val) => setMaintData((p) => ({ ...p, duration: val }))}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setMaintData((prev) => ({ ...prev, priority: p }))
                  }
                  className={`py-1.5 rounded-xl border text-[10px] font-semibold transition-all cursor-pointer ${
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

          <div className="space-y-1.5 pt-1">
            <label className="block text-[#a1a1aa] font-medium">
              Notifications
            </label>
            <div className="flex items-center justify-between text-[#d4d4d8]">
              <span>Notify Driver</span>
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
              <span>Notify Fleet Manager</span>
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
              <span>Send Email Reminder</span>
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

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Additional Note
            </label>
            <textarea
              rows="2"
              value={maintData.additionalNote}
              onChange={(e) =>
                setMaintData({ ...maintData, additionalNote: e.target.value })
              }
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl p-2.5 text-[#d4d4d8] focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#1d1d20] shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2 px-4 rounded-xl text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
