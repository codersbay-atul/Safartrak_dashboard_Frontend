import React, { useState } from "react";
import Dropdown from "../../components/Ui/DropDown";

// Dropdown Options
const MAINTENANCE_INTERVAL_OPTIONS = [
  { label: "Every 5,000 km", value: "Every 5,000 km" },
  { label: "Every 10,000 km", value: "Every 10,000 km" },
  { label: "Every 6 Months", value: "Every 6 Months" },
  { label: "Every 1 Year", value: "Every 1 Year" },
];

export default function MaintenanceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    lastServiceDate: "",
    nextServiceDue: "",
    currentOdometer: "",
    engineHour: "",
    maintenanceInterval: "",
    preferredWorkshop: "",
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

    if (!formData.currentOdometer.trim()) newErrors.currentOdometer = "Current Odometer is required";

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
          Maintenance Information
        </h2>
      </div>

      
      <form onSubmit={handleNext} className="flex flex-col gap-2.5 text-[10.5px]">
        
 
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Last Service Date</label>
            <input
              type="date"
              name="lastServiceDate"
              value={formData.lastServiceDate}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Next Service Due</label>
            <input
              type="date"
              name="nextServiceDue"
              value={formData.nextServiceDue}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Row 2: Current Odometer & Engine Hour */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Current Odometer</label>
            <input
              type="text"
              name="currentOdometer"
              placeholder="Enter Odometer Reading"
              value={formData.currentOdometer}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.currentOdometer && <p className="text-red-500 text-[9px] mt-0.5">{errors.currentOdometer}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Engine Hour</label>
            <input
              type="text"
              name="engineHour"
              placeholder="Enter Engine Hours"
              value={formData.engineHour}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Maintenance Interval & Preferred Workshop */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Maintenance Interval</label>
            <Dropdown
              label="Select Interval"
              options={MAINTENANCE_INTERVAL_OPTIONS}
              selectedValue={formData.maintenanceInterval}
              onSelect={(val) => handleDropdownSelect("maintenanceInterval", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Preferred Workshop</label>
            <input
              type="text"
              name="preferredWorkshop"
              placeholder="Enter Workshop Name"
              value={formData.preferredWorkshop}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
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