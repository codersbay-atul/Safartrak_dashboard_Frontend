import React, { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function ScheduleMaintenance({ onNext, onClose, onCancel }) {
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
    
    // Parent state me pass karein agar zaroorat ho
    if (onNext) onNext(maintData);

    // Success screen trigger karein
    setIsSuccess(true);

    // 1.5 seconds baad modal automatically close kar dein
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  // Agar Form submit ho chuka hai, toh yeh UI render hoga
  if (isSuccess) {
    return (
      <div className="w-full max-w-lg bg-[#111419] border border-gray-800 rounded-xl p-8 text-gray-200 flex flex-col items-center justify-center text-center space-y-3">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 animate-bounce" />
        <h2 className="text-lg font-semibold text-white">
          Maintenance Scheduled Successfully!
        </h2>
        <p className="text-xs text-gray-400">
          The vehicle service details have been updated in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-[#111419] border border-gray-800 rounded-xl p-5 text-gray-200 flex flex-col max-h-[85vh]">
      {/* Header */}
      <h2 className="text-base font-semibold text-white pb-3 mb-3 border-b border-gray-800/80 shrink-0">
        Schedule Maintenance
      </h2>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto pr-1.5 space-y-3.5 custom-scrollbar">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Maintenance Type
            </label>
            <div className="relative">
              <select
                value={maintData.maintenanceType}
                onChange={(e) =>
                  setMaintData({ ...maintData, maintenanceType: e.target.value })
                }
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">Select Maintenance Type</option>
                <option value="Preventive">Preventive Maintenance</option>
                <option value="Breakdown">Breakdown Repair</option>
                <option value="Inspection">Routine Inspection</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Service Date
              </label>
              <input
                type="date"
                value={maintData.serviceDate}
                onChange={(e) =>
                  setMaintData({ ...maintData, serviceDate: e.target.value })
                }
                className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Service Time
              </label>
              <input
                type="time"
                value={maintData.serviceTime}
                onChange={(e) =>
                  setMaintData({ ...maintData, serviceTime: e.target.value })
                }
                className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Estimate Duration
            </label>
            <div className="relative">
              <select
                value={maintData.duration}
                onChange={(e) =>
                  setMaintData({ ...maintData, duration: e.target.value })
                }
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">Select Durations</option>
                <option value="2 Hours">2 Hours</option>
                <option value="4 Hours">4 Hours</option>
                <option value="1 Day">1 Day</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Additional Note
            </label>
            <textarea
              rows="2.5"
              value={maintData.additionalNote}
              onChange={(e) =>
                setMaintData({ ...maintData, additionalNote: e.target.value })
              }
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg p-2.5 text-xs text-gray-300 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Reminder & Notification
            </label>
            <div className="space-y-2">
              {[
                { label: "Notify Driver", key: "notifyDriver" },
                { label: "Notify Fleet Manager", key: "notifyFleetManager" },
                { label: "Send Email Reminder", key: "sendEmailReminder" },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={maintData[item.key]}
                    onChange={(e) =>
                      setMaintData({
                        ...maintData,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="w-3.5 h-3.5 rounded bg-[#181c24] border-gray-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-xs text-gray-300">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Priority
            </label>
            <div className="flex items-center gap-3">
              {[
                { name: "Low", color: "bg-green-500" },
                { name: "Medium", color: "bg-amber-500" },
                { name: "High", color: "bg-red-500" },
              ].map((p) => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() =>
                    setMaintData({ ...maintData, priority: p.name })
                  }
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition border ${
                    maintData.priority === p.name
                      ? "bg-[#20242d] border-amber-500 text-white"
                      : "bg-[#181c24] border-gray-800 text-gray-400"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${p.color}`} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-gray-800/80 shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2 bg-[#20242d] hover:bg-[#282d38] text-white text-xs font-medium rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2 bg-[#fabb00] hover:bg-[#e0a800] text-black text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}