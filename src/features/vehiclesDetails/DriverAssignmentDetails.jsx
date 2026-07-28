import React, { useState } from "react";
import Dropdown from "../../components/Ui/DropDown";

const SHIFT_OPTIONS = [
  { label: "Day Shift", value: "Day Shift" },
  { label: "Night Shift", value: "Night Shift" },
];

export default function DriverAssignmentDetails({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    assignedDriver: "",
    driverPhone: "",
    licenseNumber: "",
    currentRoute: "",
    shift: "",
  });

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE (Commented out for now)
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    /* -------------------------------------------------------------
       2. CLEAR ERROR ON INPUT  (Commented out for now)
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

    if (!formData.assignedDriver.trim()) newErrors.assignedDriver = "Assigned Driver required";
    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver Phone required";
    } else if (!/^\d{10}$/.test(formData.driverPhone)) {
      newErrors.driverPhone = "Enter valid 10-digit phone number";
    }

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
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Driver Assignment
        </h2>
      </div>

      <form
        onSubmit={handleNext}
        className="flex flex-col gap-2.5 text-[10.5px]"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Assigned Driver
            </label>
            <input
              type="text"
              name="assignedDriver"
              placeholder="Enter Assigned Driver"
              value={formData.assignedDriver}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.assignedDriver && <p className="text-red-500 text-[9px] mt-0.5">{errors.assignedDriver}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Driver Phone
            </label>
            <input
              type="text"
              name="driverPhone"
              placeholder="Enter Driver Phone"
              value={formData.driverPhone}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.driverPhone && <p className="text-red-500 text-[9px] mt-0.5">{errors.driverPhone}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Current Route
            </label>
            <input
              type="text"
              name="currentRoute"
              placeholder="Enter Current Route"
              value={formData.currentRoute}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Shift</label>
          <Dropdown
            label="Select Shift"
            options={SHIFT_OPTIONS}
            selectedValue={formData.shift}
            onSelect={(val) => handleDropdownSelect("shift", val)}
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
