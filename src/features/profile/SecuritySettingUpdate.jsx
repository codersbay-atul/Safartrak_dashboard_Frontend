import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../../components/Ui/toast";
import { updateAccountEmail } from "../../services/accountService";

export default function SecuritySettingUpdate({ initialData = {}, onSave, onDiscard }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(() => ({
    currentEmail: initialData.email || "",
    newEmail: "",
    currentPhone: initialData.phone || "",
    newPhone: "",
    passwordConfirm: "",
    notification: initialData.notification ?? false,
    pushNotification: initialData.pushNotification ?? false,
    smsNotification: initialData.smsNotification ?? false,
    criticalAlerts: initialData.criticalAlerts ?? false,
    dailyReports: initialData.dailyReports ?? false,
  }));

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        currentEmail: initialData.email || "",
        currentPhone: initialData.phone || "",
        notification: initialData.notification ?? prev.notification,
        pushNotification: initialData.pushNotification ?? prev.pushNotification,
        smsNotification: initialData.smsNotification ?? prev.smsNotification,
        criticalAlerts: initialData.criticalAlerts ?? prev.criticalAlerts,
        dailyReports: initialData.dailyReports ?? prev.dailyReports,
      }));
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: (payload) => updateAccountEmail(payload),
    onSuccess: (data) => {
      toast.success("Email updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["account-profile"] });
      setFormData((prev) => ({
        ...prev,
        currentEmail: prev.newEmail || prev.currentEmail,
        newEmail: "",
        passwordConfirm: "",
      }));
      if (onSave) onSave(data);
    },
    onError: (error) => {
      toast.error(error?.message || "Unable to update email. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedNewEmail = formData.newEmail.trim();
    const trimmedNewPhone = formData.newPhone.trim();
    const needsEmailUpdate = trimmedNewEmail.length > 0;
    const needsPhoneUpdate = trimmedNewPhone.length > 0;

    if (!needsEmailUpdate && !needsPhoneUpdate) {
      toast.error("Please enter a new email or phone number to update.");
      return;
    }

    if (needsEmailUpdate && trimmedNewEmail === formData.currentEmail.trim()) {
      toast.error("New email must be different from the current email.");
      return;
    }

    if (!formData.passwordConfirm.trim()) {
      toast.error("Please enter your password to confirm changes.");
      return;
    }

    if (!needsEmailUpdate && needsPhoneUpdate) {
      toast.error("Phone update is not supported yet.");
      return;
    }

    mutation.mutate({
      new_email: trimmedNewEmail,
      current_password: formData.passwordConfirm,
    });
  };

  return (
    <div className="bg-[#121316] border border-[#232428] rounded-xl text-white w-full max-w-[500px] flex flex-col select-none">
      <div className="px-4 py-3 border-b border-[#232428] shrink-0">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Security Settings
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col p-4 gap-3.5"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#8e8e93] font-medium">
              Email
            </label>
            <input
              type="email"
              name="currentEmail"
              value={formData.currentEmail}
              disabled
              className="w-full bg-[#0a0b0d] border border-[#232428] rounded-lg px-3 py-2 text-[12px] text-[#71717a] outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#8e8e93] font-medium">
              Enter New Email
            </label>
            <input
              type="email"
              name="newEmail"
              autoComplete="off"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="New email"
              className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors [&:-webkit-autofill]:[--tw-bg-opacity:1] [&:-webkit-autofill]:[background-color:#0a0b0d] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#8e8e93] font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="currentPhone"
              value={formData.currentPhone}
              disabled
              className="w-full bg-[#0a0b0d] border border-[#232428] rounded-lg px-3 py-2 text-[12px] text-[#71717a] outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#8e8e93] font-medium">
              New Number
            </label>
            <input
              type="text"
              name="newPhone"
              autoComplete="off"
              value={formData.newPhone}
              onChange={handleChange}
              placeholder="New number"
              className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors [&:-webkit-autofill]:[--tw-bg-opacity:1] [&:-webkit-autofill]:[background-color:#0a0b0d] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#8e8e93] font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            autoComplete="new-password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Enter password to confirm changes"
            className="w-full bg-[#0a0b0d] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors [&:-webkit-autofill]:[--tw-bg-opacity:1] [&:-webkit-autofill]:[background-color:#0a0b0d] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
          />
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          {[
            { id: "notification", label: "Notification" },
            { id: "pushNotification", label: "Push Notification" },
            { id: "smsNotification", label: "SMS Notification" },
            { id: "criticalAlerts", label: "Critical Alerts" },
            { id: "dailyReports", label: "Daily Reports" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-[12px] text-[#e4e4e7] font-medium">
                {item.label}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={formData[item.id]}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-8 h-4.5 rounded-full relative transition-colors ${
                    formData[item.id] ? "bg-[#22c55e]" : "bg-[#27272a]"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-3.5 h-3.5 bg-white rounded-full transition-all ${
                      formData[item.id] ? "right-[2px]" : "left-[2px]"
                    }`}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 mt-1 border-t border-[#232428]">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full bg-[#27272a] hover:bg-[#323238] text-white text-[12px] font-semibold py-2 rounded-lg transition-colors cursor-pointer"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-[12px] font-semibold py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Update Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}