import React, { useState } from "react";

export default function SecuritySettingsForm({ initialData = {}, onSave, onDiscard }) {
  const [formData, setFormData] = useState({
    currentEmail: initialData.email || "alex.morgan@company.io",
    newEmail: "",
    confirmNewEmail: "",
    twoFactorPhone: initialData.phone || "+1 (415) 928-0744",
    enableLiveTracking: true,
    enableSpeedAlert: false,
    enableFuelMonitoring: false,
    enableGeofencingAlert: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full max-w-xl">
      {/* Header */}
      <h2 className="text-base font-semibold text-white mb-6 pb-4 border-b border-[#1f1f23]">
        Security Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Current Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Current Email</label>
          <input
            type="email"
            name="currentEmail"
            value={formData.currentEmail}
            disabled
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-[#a1a1aa] focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* New Email & Confirm New Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#71717a] font-medium">New Email</label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="Enter new email address"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#71717a] font-medium">Confirm New Email</label>
            <input
              type="email"
              name="confirmNewEmail"
              value={formData.confirmNewEmail}
              onChange={handleChange}
              placeholder="Re-enter new email address"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b]"
            />
          </div>
        </div>

        {/* Two-Factor Auth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Two-Factor Auth</label>
          <input
            type="text"
            name="twoFactorPhone"
            value={formData.twoFactorPhone}
            onChange={handleChange}
            placeholder="+1 (415) 928-0744"
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b]"
          />
        </div>

        {/* Toggle Preferences List */}
        <div className="flex flex-col gap-4 mt-2">
          {[
            { id: "enableLiveTracking", label: "Enable Live Tracking" },
            { id: "enableSpeedAlert", label: "Enable Speed Alert" },
            { id: "enableFuelMonitoring", label: "Enable Fuel Monitoring" },
            { id: "enableGeofencingAlert", label: "Enable Geofencing Alert" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-xs text-white font-medium">{item.label}</span>
              
              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22c55e]"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#1f1f23]">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
}