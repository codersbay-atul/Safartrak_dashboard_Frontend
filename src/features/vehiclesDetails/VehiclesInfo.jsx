import React, { useState } from "react";

export default function VehiclesInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    rcFile: null,
    insuranceFile: null,
    fitnessFile: null,
    pollutionFile: null,
    permitFile: null,
    vehicleImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    /* 
    // ==========================================
    // VALIDATION LOGIC (Currently Commented Out)
    // ==========================================
    let newErrors = {};

    if (!formData.rcFile) newErrors.rcFile = "RC Certificate is required";
    if (!formData.insuranceFile) newErrors.insuranceFile = "Insurance document required";

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
        Vehicle Settings (Document Uploads)
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Registration Certificate (RC)</label>
            <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
              <span className="truncate">{formData.rcFile ? formData.rcFile.name : "Choose file"}</span>
              <input type="file" name="rcFile" onChange={handleFileChange} className="hidden" />
            </label>
            {/* {errors.rcFile && <p className="text-[10px] text-red-400 mt-0.5">{errors.rcFile}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Insurance</label>
            <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
              <span className="truncate">{formData.insuranceFile ? formData.insuranceFile.name : "Choose file"}</span>
              <input type="file" name="insuranceFile" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Fitness Certificate</label>
            <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
              <span className="truncate">{formData.fitnessFile ? formData.fitnessFile.name : "Choose file"}</span>
              <input type="file" name="fitnessFile" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Pollution Certificate</label>
            <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
              <span className="truncate">{formData.pollutionFile ? formData.pollutionFile.name : "Choose file"}</span>
              <input type="file" name="pollutionFile" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Permit</label>
          <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
            <span className="truncate">{formData.permitFile ? formData.permitFile.name : "Choose file"}</span>
            <input type="file" name="permitFile" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Vehicle Image</label>
          <label className="flex items-center justify-between w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-xs text-gray-400 hover:border-gray-700">
            <span className="truncate">{formData.vehicleImage ? formData.vehicleImage.name : "Choose file"}</span>
            <input type="file" name="vehicleImage" onChange={handleFileChange} className="hidden" />
          </label>
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