import React, { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../../components/Ui/toast";
import { updateAccountEmail } from "../../services/accountService";

export default function SecuritySettings({ initialData = {}, onSave, onDiscard }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    notification: false,
    pushNotification: false,
    smsNotification: false,
    criticalAlerts: false,
    dailyReports: false,
  });
  const [editingField, setEditingField] = useState(null);
  const [emailDraft, setEmailDraft] = useState("");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [passwordDraft, setPasswordDraft] = useState("");

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
      setEmailDraft("");
      setPhoneDraft("");
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: (payload) => updateAccountEmail(payload),
    onSuccess: () => {
      toast.success("Email updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["account-profile"] });
      setEditingField(null);
      setPasswordDraft("");
      if (onSave) onSave({ ...formData, email: emailDraft.trim() });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const handleEmailUpdate = () => {
    const trimmedEmail = emailDraft.trim();

    if (!trimmedEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (trimmedEmail === formData.email.trim()) {
      toast.error("New email must be different from the current email.");
      return;
    }

    if (!passwordDraft.trim()) {
      toast.error("Please enter your current password to confirm the change.");
      return;
    }

    mutation.mutate({
      new_email: trimmedEmail,
      current_password: passwordDraft,
    });
  };

  const handlePhoneUpdate = () => {
    const trimmedPhone = phoneDraft.trim();

    if (!trimmedPhone) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!passwordDraft.trim()) {
      toast.error("Please enter your current password to confirm the change.");
      return;
    }

    toast.info("Phone update is not configured yet. Please contact support.");
    setEditingField(null);
    setPasswordDraft("");
  };

  return (
    <div className="bg-[#121316] border border-[#232428] rounded-xl text-white w-full max-h-[90vh] overflow-hidden flex flex-col select-none">
      <div className="p-4 border-b border-[#232428] flex items-center justify-between gap-3 shrink-0">
        <h2 className="text-[14px] font-bold text-white tracking-tight">Security Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-y-auto p-4 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <label className="text-[11px] text-[#8e8e93] font-medium">Email</label>
              <span className="text-[12px] text-white truncate">{formData.email || "Not available"}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingField(editingField === "email" ? null : "email");
                setPasswordDraft("");
                setEmailDraft("");
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272a] bg-[#0a0b0d] text-[#f4f4f5] hover:border-[#3f3f46] hover:bg-[#18181b] transition-colors cursor-pointer"
              aria-label="Edit email"
            >
              <Pencil size={14} />
            </button>
          </div>

          {editingField === "email" && (
            <div className="rounded-lg border border-[#27272a] bg-[#0a0b0d] p-3 space-y-2">
              <input
                type="email"
                value={emailDraft}
                autoComplete="new-email"
                spellCheck={false}
                onChange={(e) => setEmailDraft(e.target.value)}
                placeholder="Enter new email"
                className="w-full bg-[#121316] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
              />
              <input
                type="password"
                value={passwordDraft}
                autoComplete="new-password"
                onChange={(e) => setPasswordDraft(e.target.value)}
                placeholder="Current password"
                className="w-full bg-[#121316] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditingField(null);
                    setPasswordDraft("");
                    setEmailDraft("");
                  }}
                  className="flex items-center gap-1 rounded-md border border-[#27272a] bg-[#18181b] px-2.5 py-1.5 text-[11px] text-[#e4e4e7] cursor-pointer"
                >
                  <X size={12} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEmailUpdate}
                  disabled={mutation.isPending}
                  className="flex items-center gap-1 rounded-md bg-[#16a34a] px-2.5 py-1.5 text-[11px] font-semibold text-white cursor-pointer disabled:opacity-50"
                >
                  <Check size={12} /> {mutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <label className="text-[11px] text-[#8e8e93] font-medium">Phone Number</label>
              <span className="text-[12px] text-white truncate">{formData.phone || "Not available"}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingField(editingField === "phone" ? null : "phone");
                setPasswordDraft("");
                setPhoneDraft("");
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272a] bg-[#0a0b0d] text-[#f4f4f5] hover:border-[#3f3f46] hover:bg-[#18181b] transition-colors cursor-pointer"
              aria-label="Edit phone"
            >
              <Pencil size={14} />
            </button>
          </div>

          {editingField === "phone" && (
            <div className="rounded-lg border border-[#27272a] bg-[#0a0b0d] p-3 space-y-2">
              <input
                type="text"
                value={phoneDraft}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => setPhoneDraft(e.target.value)}
                placeholder="Enter new phone number"
                className="w-full bg-[#121316] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
              />
              <input
                type="password"
                value={passwordDraft}
                autoComplete="new-password"
                onChange={(e) => setPasswordDraft(e.target.value)}
                placeholder="Current password"
                className="w-full bg-[#121316] border border-[#27272a] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditingField(null);
                    setPasswordDraft("");
                    setPhoneDraft("");
                  }}
                  className="flex items-center gap-1 rounded-md border border-[#27272a] bg-[#18181b] px-2.5 py-1.5 text-[11px] text-[#e4e4e7] cursor-pointer"
                >
                  <X size={12} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePhoneUpdate}
                  className="flex items-center gap-1 rounded-md bg-[#16a34a] px-2.5 py-1.5 text-[11px] font-semibold text-white cursor-pointer"
                >
                  <Check size={12} /> Save
                </button>
              </div>
            </div>
          )}
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