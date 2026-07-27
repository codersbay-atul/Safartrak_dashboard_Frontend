import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DriverAssignmentDetails({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    assignedDriver: "",
    driverPhone: "",
    licenseNumber: "",
    currentRoute: "",
    shift: "",
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

    if (!formData.assignedDriver.trim()) newErrors.assignedDriver = "Assigned Driver required";
    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver Phone required";
    } else if (!/^\d{10}$/.test(formData.driverPhone)) {
      newErrors.driverPhone = "Enter valid 10-digit phone number";
    }

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
        Driver Assignment
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Assigned Driver</label>
            <input
              type="text"
              name="assignedDriver"
              placeholder="Enter Assigned Driver"
              value={formData.assignedDriver}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.assignedDriver && <p className="text-[10px] text-red-400 mt-0.5">{errors.assignedDriver}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Driver Phone</label>
            <input
              type="text"
              name="driverPhone"
              placeholder="Enter Driver Phone"
              value={formData.driverPhone}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
            {/* {errors.driverPhone && <p className="text-[10px] text-red-400 mt-0.5">{errors.driverPhone}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Route</label>
            <input
              type="text"
              name="currentRoute"
              placeholder="Enter Current Route"
              value={formData.currentRoute}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Shift</label>
          <div className="relative">
            <select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
            >
              <option value="">Enter Shift</option>
              <option value="Day Shift">Day Shift</option>
              <option value="Night Shift">Night Shift</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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