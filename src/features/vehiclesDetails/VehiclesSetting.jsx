import React, { useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function VehiclesSetting({
  onNext,
  onSave,
  onClose,
  onCancel,
  initialSettings,
  uniqueId,
}) {
  const [settings, setSettings] = useState({
    liveTracking: initialSettings?.liveTracking ?? true,
    speedAlert: initialSettings?.speedAlert ?? false,
    fuelMonitoring: initialSettings?.fuelMonitoring ?? false,
    geofencingAlert: initialSettings?.geofencingAlert ?? false,
    maintenanceAlert: initialSettings?.maintenanceAlert ?? false,
    engineDiagnostics: initialSettings?.engineDiagnostics ?? false,
    tripRecording: initialSettings?.tripRecording ?? false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const validateSettings = () => {
    // Validation Rule: At least one critical tracking/monitoring feature must remain enabled
    const hasAnyInactive = Object.values(settings).some((val) => val === true);
    if (!hasAnyInactive) {
      toast.error("At least one tracking or alert service must remain enabled.");
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateSettings()) {
      return;
    }

    try {
      setIsSubmitting(true);

      if (onSave) await onSave(settings);
      toast.success("Vehicle settings saved successfully");

      if (onNext) onNext(settings);
      else if (onClose) onClose();
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error(error?.message || "Failed to update vehicle settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    else if (onCancel) onCancel();
  };

  const toggleItems = [
    { label: "Enable Live Tracking", key: "liveTracking" },
    { label: "Enable Speed Alert", key: "speedAlert" },
    { label: "Enable Fuel Monitoring", key: "fuelMonitoring" },
    { label: "Enable Geofencing Alert", key: "geofencingAlert" },
    { label: "Enable Maintenance Alert", key: "maintenanceAlert" },
    { label: "Enable Engine Diagnostics", key: "engineDiagnostics" },
    { label: "Enable Trip Recording", key: "tripRecording" },
  ];

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full max-w-[480px] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none font-sans"
    >
      {/* Header (14px Section Title) */}
      <div className="pb-3 mb-2 border-b border-[#27272a]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Vehicle Settings
        </MainLayoutColor>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 pt-1">
          {toggleItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#18181b]/60 border border-[#27272a]/60 hover:border-[#3f3f46] hover:bg-[#18181b]/90 transition-all"
            >
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium leading-none"
              >
                {item.label}
              </MainLayoutColor>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={item.key}
                  checked={settings[item.key]}
                  onChange={handleToggle}
                  className="sr-only peer"
                />
                <div className="w-8 h-4.5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[var(--color-yellow,#ffd60a)]" />
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2.5 mt-2 border-t border-[#27272a]">
          {/* Cancel Button */}
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
            className="w-full py-2 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none">
              Cancel
            </span>
          </MainHeaderActionButton>

          {/* Save Changes Button */}
          <MainHeaderActionButton
            type="submit"
            disabled={isSubmitting}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2 rounded-xl text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[var(--color-yellow-hover,#e6c200)] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-60 shadow-md shadow-[var(--color-yellow,#ffd60a)]/10"
          >
            <span className="text-[14px] font-medium text-black whitespace-nowrap leading-none">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}