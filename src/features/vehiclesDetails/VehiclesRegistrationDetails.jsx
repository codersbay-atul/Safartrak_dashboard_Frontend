import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function VehiclesRegistrationDetails({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vinNumber: "",
    engineNumber: "",
    chassisNumber: "",
    rcExpiry: "",
    permitType: "",
    permitExpiry: "",
    fitnessCertificate: "",
    pollutionExpiry: "",
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

    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration Number required";
    if (!formData.vinNumber.trim()) newErrors.vinNumber = "VIN Number required";
    if (!formData.rcExpiry) newErrors.rcExpiry = "Select RC expiry date";

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
        Registration Details
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              placeholder="Enter Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.registrationNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.registrationNumber}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">VIN Number</label>
            <input
              type="text"
              name="vinNumber"
              placeholder="Enter VIN Number"
              value={formData.vinNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.vinNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.vinNumber}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Engine Number</label>
            <input
              type="text"
              name="engineNumber"
              placeholder="Enter Engine Number"
              value={formData.engineNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              placeholder="Enter Chassis Number"
              value={formData.chassisNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">RC Expiry</label>
            <input
              type="date"
              name="rcExpiry"
              value={formData.rcExpiry}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.rcExpiry && <p className="text-[10px] text-red-400 mt-0.5">{errors.rcExpiry}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Permit Type</label>
            <div className="relative">
              <select
                name="permitType"
                value={formData.permitType}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">National Permit</option>
                <option value="State">State Permit</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Permit Expiry</label>
          <input
            type="date"
            name="permitExpiry"
            value={formData.permitExpiry}
            onChange={handleChange}
            className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Fitness Certificate</label>
            <input
              type="text"
              name="fitnessCertificate"
              placeholder="Enter Fitness Certificate"
              value={formData.fitnessCertificate}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Pollution Expiry</label>
            <input
              type="date"
              name="pollutionExpiry"
              value={formData.pollutionExpiry}
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