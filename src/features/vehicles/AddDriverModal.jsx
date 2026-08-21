import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";

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

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.assignDriver) {
      newErrors.assignDriver = "Please select a driver";
    }

    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver phone is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.driverPhone.replace(/\s+/g, ""))) {
      newErrors.driverPhone = "Invalid phone number";
    }

    if (!formData.driverLicenseNumber.trim()) {
      newErrors.driverLicenseNumber = "License number is required";
    }

    if (!formData.licenseExpiry.trim()) {
      newErrors.licenseExpiry = "License expiry date is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.emergencyContact.replace(/\s+/g, ""))) {
      newErrors.emergencyContact = "Invalid phone number";
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

  const handleDriverSelect = (value) => {
    setFormData((prev) => ({ ...prev, assignDriver: value }));

    if (errors.assignDriver) {
      setErrors((prev) => ({ ...prev, assignDriver: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onNext) onNext(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Driver
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Assign Driver</label>
            <MainDropDown
              label="Select Assign Driver"
              options={DRIVER_OPTIONS}
              selectedValue={formData.assignDriver}
              onSelect={handleDriverSelect}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 border py-2 text-white ${
                errors.assignDriver ? "border-red-500" : "border-[#27272a]"
              }`}
            />
            {errors.assignDriver && <p className="text-red-500 text-[9px] mt-1">{errors.assignDriver}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Driver Phone</label>
              <input
                type="text"
                name="driverPhone"
                placeholder="Enter Driver Phone"
                value={formData.driverPhone}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.driverPhone ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#FDBB24]"
                }`}
              />
              {errors.driverPhone && <p className="text-red-500 text-[9px] mt-1">{errors.driverPhone}</p>}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Driver License Number</label>
              <input
                type="text"
                name="driverLicenseNumber"
                placeholder="Enter Driver License Number"
                value={formData.driverLicenseNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.driverLicenseNumber ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#FDBB24]"
                }`}
              />
              {errors.driverLicenseNumber && <p className="text-red-500 text-[9px] mt-1">{errors.driverLicenseNumber}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">License Expiry</label>
            <input
              type="date"
              name="licenseExpiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.licenseExpiry ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#FDBB24]"
              }`}
            />
            {errors.licenseExpiry && <p className="text-red-500 text-[9px] mt-1">{errors.licenseExpiry}</p>}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              placeholder="Enter Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.emergencyContact ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#FDBB24]"
              }`}
            />
            {errors.emergencyContact && <p className="text-red-500 text-[9px] mt-1">{errors.emergencyContact}</p>}
          </div>

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