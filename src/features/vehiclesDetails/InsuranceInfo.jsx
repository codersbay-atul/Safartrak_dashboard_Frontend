import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";

// Dropdown Options
const COVERAGE_TYPE_OPTIONS = [
  { label: "Comprehensive", value: "Comprehensive" },
  { label: "Third Party", value: "Third Party" },
  { label: "Zero Depreciation", value: "Zero Depreciation" },
];

const CLAIM_STATUS_OPTIONS = [
  { label: "No Active Claim", value: "No Active Claim" },
  { label: "Claim Pending", value: "Claim Pending" },
  { label: "Claim Approved", value: "Claim Approved" },
];

export default function InsuranceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    insuranceProvider: "",
    policyNumber: "",
    coverageType: "",
    insuranceExpiry: "",
    claimStatus: "",
  });

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

    if (!formData.insuranceProvider.trim()) newErrors.insuranceProvider = "Insurance Provider required";
    if (!formData.policyNumber.trim()) newErrors.policyNumber = "Policy Number required";

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

  return (
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none">
      
      {/* Header (Without Cross Button) */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Insurance Information
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-2.5 text-[10.5px]">
        
        {/* Row 1: Insurance Provider & Policy Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              placeholder="Enter Insurance Provider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.insuranceProvider && <p className="text-red-500 text-[9px] mt-0.5">{errors.insuranceProvider}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              placeholder="Enter Policy Number"
              value={formData.policyNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.policyNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.policyNumber}</p>} */}
          </div>
        </div>

        {/* Row 2: Coverage Type & Insurance Expiry */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Coverage Type</label>
            <MainDropDown
              label="Select Coverage Type"
              options={COVERAGE_TYPE_OPTIONS}
              selectedValue={formData.coverageType}
              onSelect={(val) => handleDropdownSelect("coverageType", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Insurance Expiry</label>
            <input
              type="date"
              name="insuranceExpiry"
              value={formData.insuranceExpiry}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Row 3: Claim Status */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Claim Status</label>
          <Dropdown
            label="Select Claim Status"
            options={CLAIM_STATUS_OPTIONS}
            selectedValue={formData.claimStatus}
            onSelect={(val) => handleDropdownSelect("claimStatus", val)}
            className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
          />
        </div>

      
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