import React, { useState } from "react";

export default function VehiclesSetting({ onNext, onSave, onClose, onCancel }) {
  const [settings, setSettings] = useState({
    liveTracking: true,
    speedAlert: false,
    fuelMonitoring: false,
    geofencingAlert: false,
    maintenanceAlert: false,
    engineDiagnostics: false,
    tripRecording: false,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Call onSave if provided (for data saving)
    if (onSave) onSave(settings);

    // Trigger next step
    if (onNext) {
      onNext(settings);
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
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none">
      
      {/* Header */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Vehicle Settings
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSave} className="flex flex-col gap-2.5 text-[10.5px]">
        <div className="flex flex-col gap-2 pt-1">
          {toggleItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-2 rounded-xl bg-[#18181b]/40 border border-[#27272a]/40 hover:bg-[#18181b]/80 transition-all"
            >
              <span className="text-[#d4d4d8] font-medium text-[11px]">
                {item.label}
              </span>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={item.key}
                  checked={settings[item.key]}
                  onChange={handleToggle}
                  className="sr-only peer"
                />
                <div className="w-8 h-4.5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#ffd60a]"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#1d1d20]">
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
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}