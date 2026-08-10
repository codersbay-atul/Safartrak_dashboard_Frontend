import React, { useState } from "react";
import { Check, Upload } from "lucide-react";

export default function UploadDocumentsModal({ isOpen, onClose, onNext }) {
  const [files, setFiles] = useState({
    rc: null,
    insurance: null,
    puc: null,
    roadPermit: null,
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setFiles((prev) => ({ ...prev, [field]: fileName }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!files.rc) {
      newErrors.rc = "Registration Certificate (RC) is required";
    }
    if (!files.insurance) {
      newErrors.insurance = "Insurance document is required";
    }
    if (!files.puc) {
      newErrors.puc = "Pollution Certificate (PUC) is required";
    }
    if (!files.roadPermit) {
      newErrors.roadPermit = "Road Permit document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onNext) onNext(files);
    }
  };

  const uploadFields = [
    { key: "rc", label: "Registration Certificate (RC)", placeholder: "Upload Registration Certificate (RC)" },
    { key: "insurance", label: "Insurance", placeholder: "Upload Insurance" },
    { key: "puc", label: "Pollution Certificate (PUC)", placeholder: "Upload Pollution Certificate (PUC)" },
    { key: "roadPermit", label: "Road Permit", placeholder: "Upload Road Permit" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Upload Documents
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#052e16] border border-[#14532d] text-[#4ade80] text-[10px] font-medium">
            <Check size={11} />
            Device Connected
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 text-[10.5px]">
          {uploadFields.map((field) => (
            <div key={field.key}>
              <label className="block text-[#a1a1aa] mb-1 font-medium">{field.label}</label>
              <div
                className={`flex items-center bg-[#18181b]/60 border rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all ${
                  errors[field.key] ? "border-red-500 focus-within:border-red-500" : "border-[#27272a]"
                }`}
              >
                <label className="flex items-center gap-1.5 px-3 py-2 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
                  <Upload size={13} />
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field.key)}
                  />
                </label>
                <span className="px-3 py-2 text-[#52525b] text-[10.5px] truncate">
                  {files[field.key] ? (
                    <span className="text-white">{files[field.key]}</span>
                  ) : (
                    field.placeholder
                  )}
                </span>
              </div>
              {errors[field.key] && <p className="text-red-500 text-[9px] mt-0.5">{errors[field.key]}</p>}
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#1d1d20]">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
            >
              Add New Vehicle
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}