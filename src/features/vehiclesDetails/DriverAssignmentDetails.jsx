import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";


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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.assignedDriver.trim()) {
      newErrors.assignedDriver = "Assigned Driver is required";
    }

    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver Phone is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.driverPhone.replace(/\s+/g, ""))) {
      newErrors.driverPhone = "Enter valid phone number";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License Number is required";
    }

    if (!formData.currentRoute.trim()) {
      newErrors.currentRoute = "Current Route is required";
    }

    if (!formData.shift) {
      newErrors.shift = "Please select a shift";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onNext) onNext(formData);
    }
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
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.assignedDriver ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.assignedDriver && <p className="text-red-500 text-[9px] mt-0.5">{errors.assignedDriver}</p>}
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
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.driverPhone ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.driverPhone && <p className="text-red-500 text-[9px] mt-0.5">{errors.driverPhone}</p>}
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
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.licenseNumber ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.licenseNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.licenseNumber}</p>}
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
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.currentRoute ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.currentRoute && <p className="text-red-500 text-[9px] mt-0.5">{errors.currentRoute}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Shift</label>
          <MainDropDown
            label="Select Shift"
            options={SHIFT_OPTIONS}
            selectedValue={formData.shift}
            onSelect={(val) => handleDropdownSelect("shift", val)}
            className={`w-full justify-between rounded-xl bg-[#18181b]/60 border py-1.5 px-3 text-white ${
              errors.shift ? "border-red-500" : "border-[#27272a]"
            }`}
          />
          {errors.shift && <p className="text-red-500 text-[9px] mt-0.5">{errors.shift}</p>}
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