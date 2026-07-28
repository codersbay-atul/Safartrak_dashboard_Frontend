import React, { useState } from "react";
import Dropdown from "../../components/Ui/DropDown";

const DRIVER_OPTIONS = [
  { label: "John Doe", value: "driver1" },
  { label: "Alex Smith", value: "driver2" },
  { label: "Rajesh Kumar", value: "driver3" },
];

export default function AddDriverModal({ isOpen, onClose, onNext, onBack }) {
  const [formData, setFormData] = useState({
    assignDriver: "",
    driverPhone: "",
    driverLicenseNumber: "",
    licenseExpiry: "",
    emergencyContact: "",
  });

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE (Commented out for now)
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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

  const handleDriverSelect = (value) => {
    setFormData((prev) => ({ ...prev, assignDriver: value }));

    // if (errors.assignDriver) {
    //   setErrors((prev) => ({ ...prev, assignDriver: "" }));
    // }
  };

  /* -------------------------------------------------------------
     3. VALIDATION FUNCTION (Commented out for now)
  ---------------------------------------------------------------- */
  /*
  const validateForm = () => {
    let newErrors = {};

    if (!formData.assignDriver) newErrors.assignDriver = "Please assign a driver";
    if (!formData.driverPhone.trim()) newErrors.driverPhone = "Driver phone is required";
    if (!formData.driverLicenseNumber.trim()) newErrors.driverLicenseNumber = "License number is required";
    if (!formData.licenseExpiry.trim()) newErrors.licenseExpiry = "License expiry date is required";
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* -------------------------------------------------------------
       4. CHECK VALIDATION BEFORE NEXT (Commented out for now)
    ---------------------------------------------------------------- */
    // const isValid = validateForm();
    // if (!isValid) return;

    if (onNext) onNext(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header (Without Cross Button) */}
        <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Driver
          </h2>
        </div>

        {/* Compact Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          
          {/* Assign Driver (Dropdown) */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Assign Driver</label>
            <Dropdown
              label="Select Assign Driver"
              options={DRIVER_OPTIONS}
              selectedValue={formData.assignDriver}
              onSelect={handleDriverSelect}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-2 text-white"
            />
            {/* {errors.assignDriver && <p className="text-red-500 text-[9px] mt-1">{errors.assignDriver}</p>} */}
          </div>

          {/* Row: Driver Phone & Driver License Number */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Driver Phone</label>
              <input
                type="text"
                name="driverPhone"
                placeholder="Enter Driver Phone"
                value={formData.driverPhone}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#FDBB24] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all"
              />
              {/* {errors.driverPhone && <p className="text-red-500 text-[9px] mt-1">{errors.driverPhone}</p>} */}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Driver License Number</label>
              <input
                type="text"
                name="driverLicenseNumber"
                placeholder="Enter Driver License Number"
                value={formData.driverLicenseNumber}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#FDBB24] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all"
              />
              {/* {errors.driverLicenseNumber && <p className="text-red-500 text-[9px] mt-1">{errors.driverLicenseNumber}</p>} */}
            </div>
          </div>

          {/* License Expiry */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">License Expiry</label>
            <input
              type="text"
              name="licenseExpiry"
              placeholder="Enter License Expiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#FDBB24] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.licenseExpiry && <p className="text-red-500 text-[9px] mt-1">{errors.licenseExpiry}</p>} */}
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              placeholder="Enter Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#FDBB24] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.emergencyContact && <p className="text-red-500 text-[9px] mt-1">{errors.emergencyContact}</p>} */}
          </div>

          {/* Buttons */}
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
              className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#FDBB24] hover:bg-[#e0a41d] transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}