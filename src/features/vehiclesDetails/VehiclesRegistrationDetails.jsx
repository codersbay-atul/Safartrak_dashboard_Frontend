import React, { useState } from "react";

import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";

// Dropdown Options
const PERMIT_TYPE_OPTIONS = [
  { label: "National Permit", value: "National Permit" },
  { label: "State Permit", value: "State Permit" },
];

export default function VehiclesRegistrationDetails({ onNext, onCancel, uniqueId, selectedVehicle, onSaved }) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vinNumber: "",
    engineNumber: "",
    chassisNumber: "",
    rcExpiry: "",
    permitType: "",
    permitExpiry: "",
    fitnessCertificate: "",
    pollutionExpiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE (Commented out for now)
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    /* -------------------------------------------------------------
       2. CLEAR ERROR ON INPUT CHANGE (Commented out for now)
    ---------------------------------------------------------------- */
    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: "" }));
    // }
  };

  // Helper function for Custom Dropdowns
  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // if (errors[field]) {
    //   setErrors((prev) => ({ ...prev, [field]: "" }));
    // }
  };

  /* -------------------------------------------------------------
     3. VALIDATION LOGIC FUNCTION (Commented out for now)
  ---------------------------------------------------------------- */
  /*
  const validateForm = () => {
    let newErrors = {};

    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration Number required";
    if (!formData.vinNumber.trim()) newErrors.vinNumber = "VIN Number required";
    if (!formData.rcExpiry) newErrors.rcExpiry = "Select RC expiry date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  const handleNext = async (e) => {
    e.preventDefault();

    /* -------------------------------------------------------------
       4. FORM VALIDATION CHECK BEFORE NEXT (Commented out for now)
    ---------------------------------------------------------------- */
    // const isValid = validateForm();
    // if (!isValid) return;

    if (!uniqueId) {
      toast.error("No vehicle selected");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.success("Registration details updated successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update registration details", error);
      toast.error(error?.message || "Failed to update registration details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none">
      
      {/* Header (Without Cross Button) */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Registration Details
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-2.5 text-[10.5px]">
        
        {/* Row 1: Registration Number & VIN Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              placeholder="Enter Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.registrationNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.registrationNumber}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">VIN Number</label>
            <input
              type="text"
              name="vinNumber"
              placeholder="Enter VIN Number"
              value={formData.vinNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.vinNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.vinNumber}</p>} */}
          </div>
        </div>

        {/* Row 2: Engine Number & Chassis Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Engine Number</label>
            <input
              type="text"
              name="engineNumber"
              placeholder="Enter Engine Number"
              value={formData.engineNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              placeholder="Enter Chassis Number"
              value={formData.chassisNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: RC Expiry & Permit Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">RC Expiry</label>
            <input
              type="date"
              name="rcExpiry"
              value={formData.rcExpiry}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
            />
            {/* {errors.rcExpiry && <p className="text-red-500 text-[9px] mt-0.5">{errors.rcExpiry}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Permit Type</label>
            <MainDropDown
              label="Select Permit Type"
              options={PERMIT_TYPE_OPTIONS}
              selectedValue={formData.permitType}
              onSelect={(val) => handleDropdownSelect("permitType", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>
        </div>

        {/* Permit Expiry */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Permit Expiry</label>
          <input
            type="date"
            name="permitExpiry"
            value={formData.permitExpiry}
            onChange={handleChange}
            className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
          />
        </div>

        {/* Row 4: Fitness Certificate & Pollution Expiry */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Fitness Certificate</label>
            <input
              type="text"
              name="fitnessCertificate"
              placeholder="Enter Fitness Certificate"
              value={formData.fitnessCertificate}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Pollution Expiry</label>
            <input
              type="date"
              name="pollutionExpiry"
              value={formData.pollutionExpiry}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#1d1d20]">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-xl text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Next"}
          </button>
        </div>

      </form>
    </div>
  );
}