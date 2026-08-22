import React, { useState } from "react";
import { Check, Upload } from "lucide-react";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function UploadDocumentsModal({ isOpen, onClose, onNext, onBack }) {
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
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[480px] max-h-[90vh] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col font-sans overflow-hidden"
      >
        {/* 14px Header & Badge */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#1d1d20]/60 shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block"
          >
            Upload Documents
          </MainLayoutColor>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#052e16] border border-[#14532d] text-[#4ade80]">
            <Check size={11} />
            <MainLayoutTextSize size="badgeText" className="font-medium">
              Device Connected
            </MainLayoutTextSize>
          </span>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-2.5">
            {uploadFields.map((field) => (
              <div key={field.key}>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  {field.label}
                </MainLayoutColor>
                <div
                  className={`flex items-center bg-[#18181b]/60 border rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all ${
                    errors[field.key]
                      ? "border-red-500 focus-within:border-red-500"
                      : "border-[#27272a]"
                  }`}
                >
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
                    <Upload size={13} />
                    <MainLayoutTextSize size="subInfoText">Upload</MainLayoutTextSize>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, field.key)}
                    />
                  </label>
                  <span className="px-3 py-2 text-[#52525b] text-[12px] truncate flex-1">
                    {files[field.key] ? (
                      <span className="text-white">{files[field.key]}</span>
                    ) : (
                      field.placeholder
                    )}
                  </span>
                </div>
                {errors[field.key] && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons using headerButtonText */}
          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#1d1d20] shrink-0">
            <MainLayoutButton
              type="button"
              variant="secondary"
              onClick={onBack || onClose}
              className="w-full justify-center py-2"
            >
              <MainLayoutTextSize size="headerButtonText">
                {onBack ? "Back" : "Cancel"}
              </MainLayoutTextSize>
            </MainLayoutButton>

            <MainLayoutButton
              type="submit"
              variant="primary"
              className="w-full justify-center py-2"
            >
              <MainLayoutTextSize size="headerButtonText">
                Add New Vehicle
              </MainLayoutTextSize>
            </MainLayoutButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}