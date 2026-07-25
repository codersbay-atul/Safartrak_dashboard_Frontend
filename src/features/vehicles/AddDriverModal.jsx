import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export default function AddDriverModal({ isOpen, onClose, onNext, onBack }) {
  const [formData, setFormData] = useState({
    assignDriver: "",
    driverPhone: "",
    driverLicenseNumber: "",
    licenseExpiry: "",
    emergencyContact: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Driver
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Compact Form Body (Fits without scrollbar) */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          
          {/* Assign Driver (Dropdown) */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Assign Driver</label>
            <div className="relative">
              <select
                name="assignDriver"
                value={formData.assignDriver}
                onChange={handleChange}
                className="w-full appearance-none bg-[#18181b]/60 border border-[#27272a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ffd60a] cursor-pointer"
              >
                <option value="" disabled className="text-[#52525b]">
                  Enter Assign Driver
                </option>
                <option value="driver1" className="bg-[#121214]">John Doe</option>
                <option value="driver2" className="bg-[#121214]">Alex Smith</option>
                <option value="driver3" className="bg-[#121214]">Rajesh Kumar</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
            </div>
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
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
            </div>
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Driver License Number</label>
              <input
                type="text"
                name="driverLicenseNumber"
                placeholder="Enter Driver License Number"
                value={formData.driverLicenseNumber}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
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
              className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
            />
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
              className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
            />
          </div>

          {/* Action Buttons */}
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
              Next
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}