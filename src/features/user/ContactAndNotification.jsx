import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

const DEFAULT_OPTIONS = {
  welcomeEmail: false,
  loginCredentials: false,
  emailNotifications: false,
  smsNotifications: false,
};

export default function ContactAndNotification({
  isOpen,
  onClose,
  onSave,
  initialData,
  isSaving = false,
}) {
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
      welcomeEmail: Boolean(
        invite.welcome_email || notifications.welcome_email_sent_at
      ),
      loginCredentials: Boolean(
        invite.login_credentials || notifications.credentials_sent_at
      ),
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[440px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="pb-3 mb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Contact & Notification
          </MainLayoutColor>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Notification Options */}
          <div className="flex flex-col gap-3 py-1">
            {notificationItems.map((item) => {
              const isChecked = options[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleOption(item.id)}
                  className="flex items-center gap-3 cursor-pointer py-1 transition-colors group"
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
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]">
            <MainHeaderActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSaving}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
            >
              <span className="text-[14px] font-medium whitespace-nowrap leading-none">
                Cancel
              </span>
            </MainHeaderActionButton>

            <MainHeaderActionButton
              type="submit"
              disabled={isSaving}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ffd60a] hover:bg-[#e6c200] text-black font-bold border border-[#ffd60a] cursor-pointer disabled:opacity-50"
            >
              <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
                {isSaving ? "Saving..." : "Save"}
              </span>
            </MainHeaderActionButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}