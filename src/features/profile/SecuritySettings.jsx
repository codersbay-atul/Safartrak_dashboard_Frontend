import React, { useState, useEffect } from "react";

export default function SecuritySettings({ initialData = {}, onSave, onDiscard }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    notification: false,
    pushNotification: false,
    smsNotification: false,
    criticalAlerts: false,
    dailyReports: false,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        email: initialData.email || "",
        phone: initialData.phone || "",
        notification: initialData.notification ?? false,
        pushNotification: initialData.pushNotification ?? false,
        smsNotification: initialData.smsNotification ?? false,
        criticalAlerts: initialData.criticalAlerts ?? false,
        dailyReports: initialData.dailyReports ?? false,
      });
    }
  }, [initialData]);

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
    <div className="bg-[#121316] border border-[#232428] rounded-xl text-white w-full h-full overflow-hidden flex flex-col select-none">
      <div className="p-4 border-b border-[#232428]">
        <h2 className="text-[14px] font-bold text-white tracking-tight">Security Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#8e8e93] font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#8e8e93] font-medium">Enter Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (415) 928-0744"
            className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {[
            { id: "notification", label: "Notification" },
            { id: "pushNotification", label: "Push Notification" },
            { id: "smsNotification", label: "SMS Notification" },
            { id: "criticalAlerts", label: "Critical Alerts" },
            { id: "dailyReports", label: "Daily Reports" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-[12px] text-[#e4e4e7] font-medium">{item.label}</span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-8 h-4.5 rounded-full relative ${
                    formData[item.id] ? "bg-[#22c55e]" : "bg-[#27272a]"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-3.5 h-3.5 bg-white rounded-full ${
                      formData[item.id] ? "right-[2px]" : "left-[2px]"
                    }`}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2 pt-4 border-t border-[#232428]">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full bg-[#27272a] hover:bg-[#323238] text-white text-[12px] font-semibold py-2 rounded-lg transition-colors cursor-pointer"
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-[12px] font-semibold py-2 rounded-lg transition-colors cursor-pointer"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
}