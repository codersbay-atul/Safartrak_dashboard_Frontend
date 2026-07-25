import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

export default function AddGPSDeviceModal({ isOpen, onClose, onNext }) {
  const [formData, setFormData] = useState({
    gpsDeviceId: "",
    imeiNumber: "",
    simNumber: "",
    networkProvider: "",
    deviceModel: "",
  });

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE (Uncomment when needed)
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    /* -------------------------------------------------------------
       2. CLEAR ERROR ON INPUT CHANGE (Uncomment when needed)
    ---------------------------------------------------------------- */
    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: "" }));
    // }
  };

  /* -------------------------------------------------------------
     3. VALIDATION LOGIC FUNCTION (Uncomment when needed)
  ---------------------------------------------------------------- */
  /*
  const validateForm = () => {
    let newErrors = {};

    if (!formData.gpsDeviceId.trim()) {
      newErrors.gpsDeviceId = "GPS Device ID is required";
    }
    if (!formData.imeiNumber.trim()) {
      newErrors.imeiNumber = "IMEI Number is required";
    } else if (!/^\d{15}$/.test(formData.imeiNumber.trim())) {
      newErrors.imeiNumber = "IMEI must be exactly 15 digits";
    }

    if (!formData.simNumber.trim()) {
      newErrors.simNumber = "SIM Number is required";
    }
    if (!formData.networkProvider) {
      newErrors.networkProvider = "Please select a network provider";
    }
    if (!formData.deviceModel.trim()) {
      newErrors.deviceModel = "Device Model is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* -------------------------------------------------------------
       4. FORM VALIDATION CHECK BEFORE NEXT (Uncomment when needed)
    ---------------------------------------------------------------- */
    // const isValid = validateForm();
    // if (!isValid) return;

    if (onNext) onNext(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add GPS Device
          </h2>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#052e16] border border-[#14532d] text-[#4ade80] text-[10px] font-medium">
              <Check size={11} />
              Device Connected
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#71717a] hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 text-[10.5px]">
          {/* GPS Device ID */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">GPS Device ID</label>
            <input
              type="text"
              name="gpsDeviceId"
              placeholder="Enter GPS Device ID"
              value={formData.gpsDeviceId}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                /* errors.gpsDeviceId ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {/* {errors.gpsDeviceId && <p className="text-red-500 text-[9px] mt-0.5">{errors.gpsDeviceId}</p>} */}
          </div>

          {/* IMEI Number */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">IMEI Number</label>
            <input
              type="text"
              name="imeiNumber"
              placeholder="Enter IMEI Number"
              value={formData.imeiNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                /* errors.imeiNumber ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {/* {errors.imeiNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.imeiNumber}</p>} */}
          </div>

          {/* SIM Number */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">SIM Number</label>
            <input
              type="text"
              name="simNumber"
              placeholder="Enter SIM Number"
              value={formData.simNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                /* errors.simNumber ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {/* {errors.simNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.simNumber}</p>} */}
          </div>

          {/* Network Provider & Device Model Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Network Provider</label>
              <div className="relative">
                <select
                  name="networkProvider"
                  value={formData.networkProvider}
                  onChange={handleChange}
                  className={`w-full appearance-none bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white focus:outline-none cursor-pointer transition-all ${
                    /* errors.networkProvider ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                >
                  <option value="" disabled className="text-[#52525b]">Select Network Provider</option>
                  <option value="airtel" className="bg-[#121214]">Airtel</option>
                  <option value="jio" className="bg-[#121214]">Jio</option>
                  <option value="vi" className="bg-[#121214]">Vodafone Idea</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.networkProvider && <p className="text-red-500 text-[9px] mt-0.5">{errors.networkProvider}</p>} */}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Device Model</label>
              <input
                type="text"
                name="deviceModel"
                placeholder="Enter Device Model"
                value={formData.deviceModel}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  /* errors.deviceModel ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {/* {errors.deviceModel && <p className="text-red-500 text-[9px] mt-0.5">{errors.deviceModel}</p>} */}
            </div>
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