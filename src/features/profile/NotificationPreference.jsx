import React, { useEffect, useMemo, useState } from "react";
import { Mail, Bell, MessageSquare, AlertTriangle, FileText } from "lucide-react";
// import useAccountNotifications from "../../hooks/useAccountNotifications";

const PREFERENCE_MAP = [
  { key: "email_notifications", label: "Email Notification", icon: Mail },
  { key: "push_notifications", label: "Push Notification", icon: Bell },
  { key: "sms_notifications", label: "SMS Notification", icon: MessageSquare },
  { key: "critical_alerts", label: "Critical Alerts", icon: AlertTriangle },
  { key: "daily_reports", label: "Daily Reports", icon: FileText },
];

const DEFAULT_PREFERENCES = Object.freeze({
  email_notifications: false,
  sms_notifications: false,
  push_notifications: false,
  critical_alerts: false,
  daily_reports: false,
});

function arePreferencesEqual(state, prefs) {
  return (
    state.email_notifications === prefs.email_notifications &&
    state.sms_notifications === prefs.sms_notifications &&
    state.push_notifications === prefs.push_notifications &&
    state.critical_alerts === prefs.critical_alerts &&
    state.daily_reports === prefs.daily_reports
  );
}

export default function NotificationPreference({ preferences }) {
  // const { notifications, isLoading, isError, updateNotifications, updateState } =
  //   useAccountNotifications();

  const source = preferences ?? DEFAULT_PREFERENCES;

  const [formState, setFormState] = useState(() => ({
    email_notifications: Boolean(source.email_notifications),
    sms_notifications: Boolean(source.sms_notifications),
    push_notifications: Boolean(source.push_notifications),
    critical_alerts: Boolean(source.critical_alerts),
    daily_reports: Boolean(source.daily_reports),
  }));
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const nextState = {
      email_notifications: Boolean(source.email_notifications),
      sms_notifications: Boolean(source.sms_notifications),
      push_notifications: Boolean(source.push_notifications),
      critical_alerts: Boolean(source.critical_alerts),
      daily_reports: Boolean(source.daily_reports),
    };

    if (!arePreferencesEqual(formState, nextState)) {
      setFormState(nextState);
    }
  }, [source, formState]);

  const hasChanges = useMemo(
    () =>
      PREFERENCE_MAP.some(
        (pref) => Boolean(source[pref.key]) !== formState[pref.key]
      ),
    [formState, source]
  );

  const handleToggle = (key) => {
    setFormState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setStatusMessage("Notification preferences saved locally.");
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-[#131316] border border-[#232328] p-6 text-white shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#232328]/80 mb-2">
        <h2 className="text-base font-semibold text-white tracking-wide">
          Notification Preference
        </h2>

        {hasChanges && (
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-8 items-center rounded-lg bg-[#F5B700] px-3 text-xs font-semibold text-black transition-colors hover:bg-[#d9a200] disabled:opacity-50"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* {isError && (
        <div className="my-3 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs text-rose-200">
          Failed to load notification preferences.
        </div>
      )} */}

      <div className="divide-y divide-transparent space-y-1">
        {PREFERENCE_MAP.map((pref) => {
          const IconComponent = pref.icon || Mail;
          const isActive = formState[pref.key];

          return (
            <div
              key={pref.key}
              onClick={() => handleToggle(pref.key)}
              className="flex items-center justify-between py-3.5 px-2 rounded-lg cursor-pointer transition-colors hover:bg-[#1c1c22]"
            >
              <div className="flex items-center gap-4">
                <IconComponent className="h-5 w-5 text-[#80808e] shrink-0" />
                <span className="text-sm font-medium text-[#c4c4cd]">
                  {pref.label}
                </span>
              </div>

              <button
                type="button"
                className={`inline-flex items-center justify-center h-7 px-4 text-xs font-medium rounded-full transition-all ${
                  isActive
                    ? "bg-[#062c19] text-[#10b981] border border-[#064e2b]"
                    : "bg-[#321013] text-[#ef4444] border border-[#501318]"
                }`}
              >
                {isActive ? "Active" : "Disable"}
              </button>
            </div>
          );
        })}
      </div>

      {statusMessage && (
        <div className="mt-4 rounded-lg border border-[#33333b] bg-[#1a1a20] px-4 py-2 text-xs text-[#a1a1aa]">
          {statusMessage}
        </div>
      )}
    </div>
  );
}