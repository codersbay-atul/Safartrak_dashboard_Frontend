import React, { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";

export default function PermissionAndAccountStatus({
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    permissions: {
      dashboard: false,
      liveTracking: false,
      analytics: false,
      reports: false,
      trips: false,
      vehicles: false,
      drivers: false,
      vehicleDetails: false,
      users: false,
      alerts: false,
      aoi: false,
      mobilizeImmobilize: false,
    },
    accountStatus: "Inactive",
    additionalNotes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handlePermissionChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key],
      },
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, accountStatus: status }));
  };

  const handleNotesChange = (e) => {
    setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);


    setTimeout(() => {
      setIsSubmitted(false);
      if (onSave) onSave(formData);
    }, 1500);
  };

  const permissionListLeft = [
    { id: "dashboard", label: "Dashboard" },
    { id: "liveTracking", label: "Live Tracking" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "trips", label: "Trips" },
    { id: "vehicles", label: "Vehicles" },
    { id: "drivers", label: "Drivers" },
  ];

  const permissionListRight = [
    { id: "vehicleDetails", label: "Vehicle Details" },
    { id: "users", label: "Users" },
    { id: "alerts", label: "Alerts" },
    { id: "aoi", label: "AOI" },
    { id: "mobilizeImmobilize", label: "Mobilize / Immobilize" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-[440px] bg-[#121215] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col text-white transition-all">
        
        {isSubmitted ? (
          /* Success Screen */
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#ffd60a]/10 border border-[#ffd60a]/40 flex items-center justify-center text-[#ffd60a] mb-3">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-[15px] font-bold text-white mb-1">
              Saved Successfully!
            </h3>
            <p className="text-[11px] text-[#71717a]">
              User permissions and account status have been updated.
            </p>
          </div>
        ) : (
          
          <>
            
            <div className="pb-3 mb-3 border-b border-[#27272a]/60">
              <h2 className="text-[13px] font-bold tracking-wide">
                Permissions & Account Status
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-[10.5px]"
            >
              {/* Permissions Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div className="flex flex-col gap-2.5">
                  {permissionListLeft.map((item) => (
                    <label
                      key={item.id}
                      onClick={() => handlePermissionChange(item.id)}
                      className="flex items-center gap-2.5 cursor-pointer text-[#d4d4d8] hover:text-white transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                          formData.permissions[item.id]
                            ? "border-[#ffd60a] bg-[#ffd60a] text-black"
                            : "border-[#3f3f46] bg-[#18181c]"
                        }`}
                      >
                        {formData.permissions[item.id] && (
                          <Check size={11} strokeWidth={3} />
                        )}
                      </div>
                      <span className="font-medium text-[11px]">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5">
                  {permissionListRight.map((item) => (
                    <label
                      key={item.id}
                      onClick={() => handlePermissionChange(item.id)}
                      className="flex items-center gap-2.5 cursor-pointer text-[#d4d4d8] hover:text-white transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                          formData.permissions[item.id]
                            ? "border-[#ffd60a] bg-[#ffd60a] text-black"
                            : "border-[#3f3f46] bg-[#18181c]"
                        }`}
                      >
                        {formData.permissions[item.id] && (
                          <Check size={11} strokeWidth={3} />
                        )}
                      </div>
                      <span className="font-medium text-[11px]">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            
              <div className="pt-2">
                <label className="block text-[#71717a] mb-2 font-medium">
                  Account Status
                </label>
                <div className="flex items-center gap-4">
                  {["Active", "Pending Invitation", "Inactive"].map((status) => (
                    <label
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="flex items-center gap-2 cursor-pointer text-[#d4d4d8] hover:text-white transition-colors"
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                          formData.accountStatus === status
                            ? "border-[#ffd60a] bg-transparent"
                            : "border-[#3f3f46] bg-transparent"
                        }`}
                      >
                        {formData.accountStatus === status && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ffd60a]" />
                        )}
                      </div>
                      <span className="text-[11px]">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-[#71717a] mb-1 font-medium">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleNotesChange}
                  placeholder="Enter internal remarks or onboarding notes..."
                  className="w-full bg-[#18181c] border border-[#27272a] rounded-xl p-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all resize-none text-[10.5px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#27272a]/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-[11px] font-semibold bg-[#27272a]/70 hover:bg-[#27272a] text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}