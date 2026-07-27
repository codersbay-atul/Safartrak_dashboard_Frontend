import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function GPSDeviceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    trackerId: "",
    imeiNumber: "",
    simNumber: "",
    networkProvider: "",
    firmware: "",
    gpsStatus: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    /* 
    // ==========================================
    // VALIDATION LOGIC (Currently Commented Out)
    // ==========================================
    let newErrors = {};

    if (!formData.trackerId.trim()) newErrors.trackerId = "Tracker ID is required";
    if (!formData.imeiNumber.trim()) newErrors.imeiNumber = "IMEI Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    */

    if (onNext) onNext(formData);
  };

  return (
    <div className="w-full max-w-lg bg-[#111419] border border-gray-800 rounded-xl p-5 text-gray-200">
      <h2 className="text-base font-semibold text-white pb-3 mb-4 border-b border-gray-800/80">
        GPS & Device Information
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Tracker ID</label>
            <input
              type="text"
              name="trackerId"
              placeholder="Enter Tracker ID"
              value={formData.trackerId}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            {/* {errors.trackerId && <p className="text-[10px] text-red-400 mt-0.5">{errors.trackerId}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">IMEI Number</label>
            <input
              type="text"
              name="imeiNumber"
              placeholder="Enter IMEI Number"
              value={formData.imeiNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            {/* {errors.imeiNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.imeiNumber}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">SIM Number</label>
            <input
              type="text"
              name="simNumber"
              placeholder="Enter SIM Number"
              value={formData.simNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Network Provider</label>
            <div className="relative">
              <select
                name="networkProvider"
                value={formData.networkProvider}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">Select Provider</option>
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vodafone Idea">Vodafone Idea</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Firmware Version</label>
            <input
              type="text"
              name="firmware"
              placeholder="Enter Firmware Version"
              value={formData.firmware}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">GPS Status</label>
            <input
              type="text"
              name="gpsStatus"
              placeholder="Enter GPS Status"
              value={formData.gpsStatus}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 mt-4 border-t border-gray-800/80">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 bg-[#20242d] hover:bg-[#282d38] text-white text-xs font-medium rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#fabb00] hover:bg-[#e0a800] text-black text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}