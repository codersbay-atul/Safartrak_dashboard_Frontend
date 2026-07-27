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

    // Trigger next step (Step 9: Schedule Maintenance)
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
    <div className="w-full max-w-lg bg-[#111419] border border-gray-800 rounded-xl p-5 text-gray-200">
      <h2 className="text-base font-semibold text-white pb-3 mb-4 border-b border-gray-800/80">
        Vehicle Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-4">
        {toggleItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span className="text-xs text-gray-300 font-medium">{item.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name={item.key}
                checked={settings[item.key]}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3 pt-3 mt-4 border-t border-gray-800/80">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 bg-[#20242d] hover:bg-[#282d38] text-white text-xs font-medium rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#fabb00] hover:bg-[#e0a800] text-black text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}