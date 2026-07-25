import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export default function AddFleetAssignmentModal({ isOpen, onClose, onNext }) {
  const [formData, setFormData] = useState({
    fleetGroup: "",
    operatingRegion: "",
    depotWarehouse: "",
    businessUnit: "",
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

    if (!formData.fleetGroup) {
      newErrors.fleetGroup = "Please select a Fleet Group";
    }
    if (!formData.operatingRegion) {
      newErrors.operatingRegion = "Please select an Operating Region";
    }
    if (!formData.depotWarehouse) {
      newErrors.depotWarehouse = "Please select a Depot/Warehouse";
    }
    if (!formData.businessUnit.trim()) {
      newErrors.businessUnit = "Business Unit is required";
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
      {/* Modal Card */}
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Fleet Assignment
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Compact Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          
          {/* Fleet Group (Dropdown) */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Fleet Group</label>
            <div className="relative">
              <select
                name="fleetGroup"
                value={formData.fleetGroup}
                onChange={handleChange}
                className={`w-full appearance-none bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white focus:outline-none cursor-pointer transition-all ${
                  /* errors.fleetGroup ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              >
                <option value="" disabled className="text-[#52525b]">
                  Select Fleet Group
                </option>
                <option value="group1" className="bg-[#121214]">North Region Fleet</option>
                <option value="group2" className="bg-[#121214]">South Logistics</option>
                <option value="group3" className="bg-[#121214]">Express Delivery</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
            </div>
            {/* {errors.fleetGroup && <p className="text-red-500 text-[9px] mt-0.5">{errors.fleetGroup}</p>} */}
          </div>

          {/* Row: Operating Region & Depot / Warehouse */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Operating Region</label>
              <div className="relative">
                <select
                  name="operatingRegion"
                  value={formData.operatingRegion}
                  onChange={handleChange}
                  className={`w-full appearance-none bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white focus:outline-none cursor-pointer transition-all ${
                    /* errors.operatingRegion ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                >
                  <option value="" disabled className="text-[#52525b]">
                    Select Operating Region
                  </option>
                  <option value="north" className="bg-[#121214]">North Zone</option>
                  <option value="west" className="bg-[#121214]">West Zone</option>
                  <option value="east" className="bg-[#121214]">East Zone</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.operatingRegion && <p className="text-red-500 text-[9px] mt-0.5">{errors.operatingRegion}</p>} */}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Depot / Warehouse</label>
              <div className="relative">
                <select
                  name="depotWarehouse"
                  value={formData.depotWarehouse}
                  onChange={handleChange}
                  className={`w-full appearance-none bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white focus:outline-none cursor-pointer transition-all ${
                    /* errors.depotWarehouse ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                >
                  <option value="" disabled className="text-[#52525b]">
                    Select Depot / Warehouse
                  </option>
                  <option value="depot1" className="bg-[#121214]">Central Warehouse 01</option>
                  <option value="depot2" className="bg-[#121214]">South Depot A</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.depotWarehouse && <p className="text-red-500 text-[9px] mt-0.5">{errors.depotWarehouse}</p>} */}
            </div>
          </div>

          {/* Business Unit */}
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Business Unit</label>
            <input
              type="text"
              name="businessUnit"
              placeholder="Enter Business Unit"
              value={formData.businessUnit}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                /* errors.businessUnit ? "border-red-500 focus:border-red-500" : */ "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {/* {errors.businessUnit && <p className="text-red-500 text-[9px] mt-0.5">{errors.businessUnit}</p>} */}
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