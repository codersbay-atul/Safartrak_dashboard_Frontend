import React, { useEffect, useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

const DEFAULT_PERMISSIONS = {
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
};

export default function PermissionAndAccountStatus({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    permissions: DEFAULT_PERMISSIONS,
    additionalNotes: "",
  });

  useEffect(() => {
    if (!initialData) {
      setFormData({
        permissions: DEFAULT_PERMISSIONS,
        additionalNotes: "",
      });
      return;
    }

    const user = initialData.user ?? initialData;
    const permissions = Array.isArray(user.permissions) ? user.permissions : [];
    const permissionMap = {
      dashboard: "dashboard",
      live_tracking: "liveTracking",
      analytics: "analytics",
      reports: "reports",
      trips: "trips",
      vehicles: "vehicles",
      alerts: "alerts",
      users: "users",
      aoi: "aoi",
    };

    const nextPermissions = { ...DEFAULT_PERMISSIONS };
    permissions.forEach((permission) => {
      const key = permissionMap[String(permission).toLowerCase()];
      if (key) {
        nextPermissions[key] = true;
      }
    });

    setFormData({
      permissions: nextPermissions,
      additionalNotes: user.notes || "",
    });
  }, [initialData]);

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[460px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col transition-all"
      >
        {isSubmitted ? (
          /* Success Screen */
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#ffd60a]/10 border border-[#ffd60a]/40 flex items-center justify-center text-[var(--color-yellow,#ffd60a)] mb-3">
              <CheckCircle2 size={28} />
            </div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-bold mb-1 block text-[15px]"
            >
              Saved Successfully!
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block text-[12px]"
            >
              User permissions have been updated.
            </MainLayoutColor>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="pb-3 mb-3 border-b border-[#27272a]">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-bold tracking-wide block text-[14px]"
              >
                Permissions
              </MainLayoutColor>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Permissions Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div className="flex flex-col gap-2.5">
                  {permissionListLeft.map((item) => {
                    const isChecked = formData.permissions[item.id];
                    return (
                      <label
                        key={item.id}
                        onClick={() => handlePermissionChange(item.id)}
                        className="flex items-center gap-2.5 cursor-pointer transition-colors group py-0.5"
                      >
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                            isChecked
                              ? "border-[var(--color-yellow,#ffd60a)] bg-[var(--color-yellow,#ffd60a)] text-black"
                              : "border-[#3f3f46] bg-[#18181b]/80 group-hover:border-[#52525b]"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color={isChecked ? "title" : "subtitle"}
                          size="subInfoText"
                          className="font-medium text-[12px] group-hover:text-white transition-colors"
                        >
                          {item.label}
                        </MainLayoutColor>
                      </label>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2.5">
                  {permissionListRight.map((item) => {
                    const isChecked = formData.permissions[item.id];
                    return (
                      <label
                        key={item.id}
                        onClick={() => handlePermissionChange(item.id)}
                        className="flex items-center gap-2.5 cursor-pointer transition-colors group py-0.5"
                      >
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                            isChecked
                              ? "border-[var(--color-yellow,#ffd60a)] bg-[var(--color-yellow,#ffd60a)] text-black"
                              : "border-[#3f3f46] bg-[#18181b]/80 group-hover:border-[#52525b]"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color={isChecked ? "title" : "subtitle"}
                          size="subInfoText"
                          className="font-medium text-[12px] group-hover:text-white transition-colors"
                        >
                          {item.label}
                        </MainLayoutColor>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <MainLayoutColor
                  as="label"
                  color="subtitle"
                  className="block mb-1 font-medium text-[12px]"
                >
                  Additional Notes
                </MainLayoutColor>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleNotesChange}
                  placeholder="Enter internal remarks or onboarding notes..."
                  className="w-full bg-[#18181b]/80 border border-[#27272a] rounded-xl p-2.5 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#27272a]">
                <MainHeaderActionButton
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer"
                >
                  <span className="text-[14px] font-medium whitespace-nowrap leading-none">
                    Cancel
                  </span>
                </MainHeaderActionButton>

                <MainHeaderActionButton
                  type="submit"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#ffd60a] hover:bg-[#e6c200] text-black font-bold border border-[#ffd60a] cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
                    Save
                  </span>
                </MainHeaderActionButton>
              </div>
            </form>
          </>
        )}
      </MainLayoutColor>
    </div>
  );
}