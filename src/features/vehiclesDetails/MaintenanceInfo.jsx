import React, { useState } from "react";

export default function MaintenanceInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    lastServiceDate: "",
    nextServiceDue: "",
    currentOdometer: "",
    engineHour: "",
    maintenanceInterval: "",
    preferredWorkshop: "",
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

    if (!formData.currentOdometer.trim()) newErrors.currentOdometer = "Current Odometer is required";

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
        Maintenance Information
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Last Service Date</label>
            <input
              type="date"
              name="lastServiceDate"
              value={formData.lastServiceDate}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Next Service Due</label>
            <input
              type="date"
              name="nextServiceDue"
              value={formData.nextServiceDue}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Odometer</label>
            <input
              type="text"
              name="currentOdometer"
              placeholder="Enter Odometer Reading"
              value={formData.currentOdometer}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.currentOdometer && <p className="text-[10px] text-red-400 mt-0.5">{errors.currentOdometer}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Engine Hour</label>
            <input
              type="text"
              name="engineHour"
              placeholder="Enter Engine Hours"
              value={formData.engineHour}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Maintenance Interval</label>
            <input
              type="text"
              name="maintenanceInterval"
              placeholder="Enter Maintenance Interval"
              value={formData.maintenanceInterval}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Preferred Workshop</label>
            <input
              type="text"
              name="preferredWorkshop"
              placeholder="Enter Workshop Name"
              value={formData.preferredWorkshop}
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