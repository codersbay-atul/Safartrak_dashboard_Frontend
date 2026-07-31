import React, { useState } from "react";

export default function SecuritySettingUpdate({ initialData = {}, onSave, onDiscard }) {
  const [formData, setFormData] = useState({
    currentEmail: initialData.email || "alex.morgan@company.io",
    newEmail: "",
    emailPasswordConfirm: "",
    currentPhone: initialData.phone || "+1 (415) 928-0744",
    newPhone: "",
    phonePasswordConfirm: "",
    notification: true,
    pushNotification: false,
    smsNotification: false,
    criticalAlerts: false,
    dailyReports: false,
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
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-5 text-white w-full max-w-[420px]">
      <h2 className="text-xs font-semibold text-white mb-4">
        Security Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-[#71717a] font-normal">Email</label>
          <input
            type="email"
            name="currentEmail"
            value={formData.currentEmail}
            disabled
            className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-3 py-1.5 text-[11px] text-[#a1a1aa] focus:outline-none cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#71717a] font-normal">Enter New Email</label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="Enter new email address"
              className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-[10px] text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#27272a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#71717a] font-normal">Enter Password</label>
            <input
              type="password"
              name="emailPasswordConfirm"
              value={formData.emailPasswordConfirm}
              onChange={handleChange}
              placeholder="Enter Password for confirmation"
              className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-[10px] text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#27272a]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-0.5">
          <label className="text-[10px] text-[#71717a] font-normal">Enter Phone Number</label>
          <input
            type="text"
            name="currentPhone"
            value={formData.currentPhone}
            disabled
            className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-3 py-1.5 text-[11px] text-[#a1a1aa] focus:outline-none cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#71717a] font-normal">Enter New Number</label>
            <input
              type="text"
              name="newPhone"
              value={formData.newPhone}
              onChange={handleChange}
              placeholder="Enter New Number"
              className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-[10px] text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#27272a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#71717a] font-normal">Enter Password</label>
            <input
              type="password"
              name="phonePasswordConfirm"
              value={formData.phonePasswordConfirm}
              onChange={handleChange}
              placeholder="Enter Password for confirmation"
              className="w-full bg-[#09090b] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-[10px] text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#27272a]"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-2.5 mt-2">
          {[
            { id: "notification", label: "Notification" },
            { id: "pushNotification", label: "Push Notification" },
            { id: "smsNotification", label: "SMS Notification" },
            { id: "criticalAlerts", label: "Critical Alerts" },
            { id: "dailyReports", label: "Daily Reports" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-[11px] text-white font-medium">{item.label}</span>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-8 h-5 bg-[#1f1f23] rounded-full peer peer-checked:bg-white transition-colors duration-200">
                  <div className="absolute top-[2px] left-[2px] w-4 h-4 bg-white peer-checked:bg-black rounded-full transition-all duration-200 peer-checked:translate-x-3"></div>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-3 pt-1">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full bg-[#1f1f23] hover:bg-[#27272a] text-white text-[11px] font-medium py-2 rounded-lg transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-[11px] font-medium py-2 rounded-lg transition-colors"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
}