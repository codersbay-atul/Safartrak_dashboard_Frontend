import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

const DEFAULT_OPTIONS = {
  welcomeEmail: false,
  loginCredentials: false,
  emailNotifications: false,
  smsNotifications: false,
};

export default function ContactAndNotification({ isOpen, onClose, onSave, initialData }) {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  useEffect(() => {
    if (!initialData) {
      setOptions(DEFAULT_OPTIONS);
      return;
    }

    const user = initialData.user ?? initialData;
    const notifications = user.notifications ?? {};
    const invite = initialData.invite ?? {};

    setOptions({
      welcomeEmail: Boolean(invite.welcome_email || notifications.welcome_email_sent_at),
      loginCredentials: Boolean(invite.login_credentials || notifications.credentials_sent_at),
      emailNotifications: Boolean(notifications.email_notifications),
      smsNotifications: Boolean(notifications.sms_notifications),
    });
  }, [initialData]);

  if (!isOpen) return null;

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(options);
  };

  const notificationItems = [
    { id: "welcomeEmail", label: "Send Welcome Email" },
    { id: "loginCredentials", label: "Send Login Credentials" },
    { id: "emailNotifications", label: "Enable Email Notifications" },
    { id: "smsNotifications", label: "Enable SMS Notifications" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-[440px] bg-[#121215] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col text-white">
        
        {/* Header - No Close/Cross Button */}
        <div className="pb-3 mb-3 border-b border-[#27272a]/60">
          <h2 className="text-[13px] font-bold tracking-wide">
            Contact & Notification
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[10.5px]">
          {/* Notification Options */}
          <div className="flex flex-col gap-3 py-1">
            {notificationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleOption(item.id)}
                className="flex items-center gap-3 cursor-pointer text-[#d4d4d8] hover:text-white transition-colors py-0.5"
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    options[item.id]
                      ? "border-[#ffd60a] bg-[#ffd60a] text-black"
                      : "border-[#3f3f46] bg-[#18181c]"
                  }`}
                >
                  {options[item.id] && <Check size={11} strokeWidth={3} />}
                </div>
                <span className="font-medium text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]/60">
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
      </div>
    </div>
  );
}