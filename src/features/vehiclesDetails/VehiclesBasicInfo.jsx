import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function VehiclesBasicInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    manufacturer: "",
    model: "",
    color: "",
    capacity: "",
    fuelType: "",
    fleet: "",
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

    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle Number is required";
    if (!formData.vehicleType) newErrors.vehicleType = "Select Vehicle Type";
    if (!formData.manufacturer) newErrors.manufacturer = "Select Manufacturer";
    if (!formData.model.trim()) newErrors.model = "Model is required";

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
        Basic Information
      </h2>

      <form onSubmit={handleNext} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Enter Vehicle Number"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            {/* {errors.vehicleNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.vehicleNumber}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Vehicle Type</label>
            <div className="relative">
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 pr-8"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Heavy Truck">Heavy Truck</option>
                <option value="Trailer">Trailer</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {/* {errors.vehicleType && <p className="text-[10px] text-red-400 mt-0.5">{errors.vehicleType}</p>} */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Manufacturer</label>
            <div className="relative">
              <select
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 pr-8"
              >
                <option value="">Select Manufacturer Name</option>
                <option value="Tata Motors">Tata Motors</option>
                <option value="Ashok Leyland">Ashok Leyland</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {/* {errors.manufacturer && <p className="text-[10px] text-red-400 mt-0.5">{errors.manufacturer}</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter Model"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            {/* {errors.model && <p className="text-[10px] text-red-400 mt-0.5">{errors.model}</p>} */}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Color</label>
          <input
            type="text"
            name="color"
            placeholder="Enter Color"
            value={formData.color}
            onChange={handleChange}
            className="w-full bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Capacity (Ton)</label>
            <div className="relative">
              <select
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">Enter Capacity (Ton)</option>
                <option value="12 Tons">12 Tons</option>
                <option value="16 Tons">16 Tons</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Fuel Type</label>
            <div className="relative">
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full appearance-none bg-[#181c24] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none pr-8"
              >
                <option value="">Enter Fuel Type</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Fleet</label>
          <input
            type="text"
            name="fleet"
            placeholder="Enter West Fleet"
            value={formData.fleet}
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