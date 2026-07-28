import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function VehiclesInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    rcFile: null,
    insuranceFile: null,
    fitnessFile: null,
    pollutionFile: null,
    permitFile: null,
    vehicleImage: null,
  });

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE (Commented out for now)
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      /* -------------------------------------------------------------
         2. CLEAR ERROR ON FILE UPLOAD (Commented out for now)
      ---------------------------------------------------------------- */
      // if (errors[name]) {
      //   setErrors((prev) => ({ ...prev, [name]: "" }));
      // }
    }
  };

  /* -------------------------------------------------------------
     3. VALIDATION LOGIC FUNCTION (Commented out for now)
  ---------------------------------------------------------------- */
  /*
  const validateForm = () => {
    let newErrors = {};

    if (!formData.rcFile) newErrors.rcFile = "RC Certificate is required";
    if (!formData.insuranceFile) newErrors.insuranceFile = "Insurance document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  const handleNext = (e) => {
    e.preventDefault();

    /* -------------------------------------------------------------
       4. FORM VALIDATION CHECK BEFORE NEXT (Commented out for now)
    ---------------------------------------------------------------- */
    // const isValid = validateForm();
    // if (!isValid) return;

    if (onNext) onNext(formData);
  };

  const uploadFields = [
    { name: "rcFile", label: "Registration Certificate (RC)", placeholder: "Upload RC Certificate" },
    { name: "insuranceFile", label: "Insurance", placeholder: "Upload Insurance Document" },
    { name: "fitnessFile", label: "Fitness Certificate", placeholder: "Upload Fitness Certificate" },
    { name: "pollutionFile", label: "Pollution Certificate", placeholder: "Upload Pollution Certificate" },
    { name: "permitFile", label: "Permit", placeholder: "Upload Permit Document" },
    { name: "vehicleImage", label: "Vehicle Image", placeholder: "Upload Vehicle Image" },
  ];

  return (
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col select-none">
      
      {/* Header (Without Cross Button) */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Vehicle Settings (Document Uploads)
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-2.5 text-[10.5px]">
        
        {/* Row 1: RC & Insurance */}
        <div className="grid grid-cols-2 gap-2.5">
          {uploadFields.slice(0, 2).map((field) => (
            <div key={field.name}>
              <label className="block text-[#a1a1aa] mb-1 font-medium">{field.label}</label>
              <div className="flex items-center bg-[#18181b]/60 border border-[#27272a] rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all">
                <label className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
                  <Upload size={12} />
                  <span>Upload</span>
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="px-2.5 py-1.5 text-[#52525b] text-[10px] truncate">
                  {formData[field.name] ? (
                    <span className="text-white">{formData[field.name].name}</span>
                  ) : (
                    field.placeholder
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Fitness & Pollution */}
        <div className="grid grid-cols-2 gap-2.5">
          {uploadFields.slice(2, 4).map((field) => (
            <div key={field.name}>
              <label className="block text-[#a1a1aa] mb-1 font-medium">{field.label}</label>
              <div className="flex items-center bg-[#18181b]/60 border border-[#27272a] rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all">
                <label className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
                  <Upload size={12} />
                  <span>Upload</span>
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="px-2.5 py-1.5 text-[#52525b] text-[10px] truncate">
                  {formData[field.name] ? (
                    <span className="text-white">{formData[field.name].name}</span>
                  ) : (
                    field.placeholder
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: Permit */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Permit</label>
          <div className="flex items-center bg-[#18181b]/60 border border-[#27272a] rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all">
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
              <Upload size={12} />
              <span>Upload</span>
              <input
                type="file"
                name="permitFile"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="px-3 py-1.5 text-[#52525b] text-[10.5px] truncate">
              {formData.permitFile ? (
                <span className="text-white">{formData.permitFile.name}</span>
              ) : (
                "Upload Permit Document"
              )}
            </span>
          </div>
        </div>

        {/* Row 4: Vehicle Image */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Vehicle Image</label>
          <div className="flex items-center bg-[#18181b]/60 border border-[#27272a] rounded-xl overflow-hidden focus-within:border-[#ffd60a] transition-all">
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0">
              <Upload size={12} />
              <span>Upload</span>
              <input
                type="file"
                name="vehicleImage"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="px-3 py-1.5 text-[#52525b] text-[10.5px] truncate">
              {formData.vehicleImage ? (
                <span className="text-white">{formData.vehicleImage.name}</span>
              ) : (
                "Upload Vehicle Image"
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#1d1d20]">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 px-4 rounded-xl text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>

      </form>
    </div>
  );
}