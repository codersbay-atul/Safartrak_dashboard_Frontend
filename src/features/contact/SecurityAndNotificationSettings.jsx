import React, { useState } from "react";

export default function SecurityAndNotificationSettings({ initialData = {}, onSave, onDiscard }) {
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
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full max-w-xl">
  
      <h2 className="text-sm font-semibold text-white mb-5 pb-3 border-b border-[#1f1f23]">
        Security Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#71717a] font-medium">Email</label>
          <input
            type="email"
            name="currentEmail"
            value={formData.currentEmail}
            disabled
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-[#a1a1aa] focus:outline-none cursor-not-allowed"
          />
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#71717a] font-medium">Enter New Email</label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="Enter new email address"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#71717a] font-medium">Enter Password</label>
            <input
              type="password"
              name="emailPasswordConfirm"
              value={formData.emailPasswordConfirm}
              onChange={handleChange}
              placeholder="Enter Password for confirmation"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
          </div>
        </div>

        
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-[11px] text-[#71717a] font-medium">Enter Phone Number</label>
          <input
            type="text"
            name="currentPhone"
            value={formData.currentPhone}
            disabled
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-[#a1a1aa] focus:outline-none cursor-not-allowed"
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#71717a] font-medium">Enter New Number</label>
            <input
              type="text"
              name="newPhone"
              value={formData.newPhone}
              onChange={handleChange}
              placeholder="Enter New Number"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#71717a] font-medium">Enter Password</label>
            <input
              type="password"
              name="phonePasswordConfirm"
              value={formData.phonePasswordConfirm}
              onChange={handleChange}
              placeholder="Enter Password for confirmation"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#3f3f46]"
            />
          </div>
        </div>

        {/* Notification Switches List */}
        <div className="flex flex-col gap-3 mt-2">
          {[
            { id: "notification", label: "Notification" },
            { id: "pushNotification", label: "Push Notification" },
            { id: "smsNotification", label: "SMS Notification" },
            { id: "criticalAlerts", label: "Critical Alerts" },
            { id: "dailyReports", label: "Daily Reports" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-xs text-white font-medium">{item.label}</span>

              {/* iOS Style Switch */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5.5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-white after:peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
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