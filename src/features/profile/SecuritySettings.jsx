import React, { useState } from "react";
import { Pencil } from "lucide-react";

export default function SecuritySettings({ initialData = {}, onSave, onDiscard }) {
  const [formData, setFormData] = useState({
    email: initialData.email || "alex.morgan@company.io",
    phone: initialData.phone || "+1 (415) 928-0744",
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
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl text-white w-full h-full overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#1f1f23]">
        <h2 className="text-base font-semibold text-white">Security Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto p-5 gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Email</label>
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-3.5 pr-12 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
            <button
              type="button"
              className="absolute right-2 p-1.5 bg-[#1f1f23] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white rounded-lg transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Enter Phone Number Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Enter Phone Number</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (415) 928-0744"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-3.5 pr-12 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
            <button
              type="button"
              className="absolute right-2 p-1.5 bg-[#1f1f23] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white rounded-lg transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3.5 mt-2">
          {[
            { id: "notification", label: "Notification" },
            { id: "pushNotification", label: "Push Notification" },
            { id: "smsNotification", label: "SMS Notification" },
            { id: "criticalAlerts", label: "Critical Alerts" },
            { id: "dailyReports", label: "Daily Reports" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-xs text-white font-medium">{item.label}</span>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#27272a] rounded-full peer peer-checked:bg-white transition-colors duration-200">
                  <div className="absolute top-[3px] left-[3px] w-4.5 h-4.5 bg-white peer-checked:bg-black rounded-full transition-all duration-200 peer-checked:translate-x-4"></div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#1f1f23]">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
}