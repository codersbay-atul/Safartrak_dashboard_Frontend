import React, { useState } from "react";
import Dropdown from "../../components/Ui/DropDown";

const NETWORK_PROVIDER_OPTIONS = [
  { label: "Airtel", value: "Airtel" },
  { label: "Jio", value: "Jio" },
  { label: "Vodafone Idea", value: "Vodafone Idea" },
];

export default function GPSDeviceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    trackerId: "",
    imeiNumber: "",
    simNumber: "",
    networkProvider: "",
    firmware: "",
    gpsStatus: "",
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

    if (!formData.trackerId.trim()) newErrors.trackerId = "Tracker ID is required";
    if (!formData.imeiNumber.trim()) newErrors.imeiNumber = "IMEI Number is required";

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
          GPS & Device Information
        </h2>
      </div>

      <form
        onSubmit={handleNext}
        className="flex flex-col gap-2.5 text-[10.5px]"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Tracker ID
            </label>
            <input
              type="text"
              name="trackerId"
              placeholder="Enter Tracker ID"
              value={formData.trackerId}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.trackerId && <p className="text-red-500 text-[9px] mt-0.5">{errors.trackerId}</p>} */}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              IMEI Number
            </label>
            <input
              type="text"
              name="imeiNumber"
              placeholder="Enter IMEI Number"
              value={formData.imeiNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            {/* {errors.imeiNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.imeiNumber}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              SIM Number
            </label>
            <input
              type="text"
              name="simNumber"
              placeholder="Enter SIM Number"
              value={formData.simNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Network Provider
            </label>
            <Dropdown
              label="Select Provider"
              options={NETWORK_PROVIDER_OPTIONS}
              selectedValue={formData.networkProvider}
              onSelect={(val) => handleDropdownSelect("networkProvider", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              Firmware Version
            </label>
            <input
              type="text"
              name="firmware"
              placeholder="Enter Firmware Version"
              value={formData.firmware}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">
              GPS Status
            </label>
            <input
              type="text"
              name="gpsStatus"
              placeholder="Enter GPS Status"
              value={formData.gpsStatus}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
          </div>
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
