import React, { useState } from "react";

export default function InsuranceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    insuranceProvider: "",
    policyNumber: "",
    coverageType: "",
    insuranceExpiry: "",
    claimStatus: "",
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

    if (!formData.insuranceProvider.trim()) newErrors.insuranceProvider = "Insurance Provider required";
    if (!formData.policyNumber.trim()) newErrors.policyNumber = "Policy Number required";

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
        Insurance Information
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              placeholder="Enter Insurance Provider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.insuranceProvider && <p className="text-[10px] text-red-400 mt-0.5">{errors.insuranceProvider}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              placeholder="Enter Policy Number"
              value={formData.policyNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.policyNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.policyNumber}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Coverage Type</label>
            <input
              type="text"
              name="coverageType"
              placeholder="Enter Coverage Type"
              value={formData.coverageType}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Insurance Expiry</label>
            <input
              type="date"
              name="insuranceExpiry"
              value={formData.insuranceExpiry}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Claim Status</label>
          <input
            type="text"
            name="claimStatus"
            placeholder="Enter Claim Status"
            value={formData.claimStatus}
            onChange={handleChange}
            className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />
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