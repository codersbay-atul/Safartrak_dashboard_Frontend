import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";


const FLEET_GROUP_OPTIONS = [
  { label: "North Region Fleet", value: "group1" },
  { label: "South Logistics", value: "group2" },
  { label: "Express Delivery", value: "group3" },
];

const OPERATING_REGION_OPTIONS = [
  { label: "North Zone", value: "north" },
  { label: "West Zone", value: "west" },
  { label: "East Zone", value: "east" },
];

const DEPOT_WAREHOUSE_OPTIONS = [
  { label: "Central Warehouse 01", value: "depot1" },
  { label: "South Depot A", value: "depot2" },
];

export default function AddFleetAssignmentModal({ isOpen, onClose, onNext }) {
  const [formData, setFormData] = useState({
    fleetGroup: "",
    operatingRegion: "",
    depotWarehouse: "",
    businessUnit: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onNext) onNext(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible">
        
        <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Fleet Assignment
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Fleet Group</label>
            <MainDropDown
              label="Select Fleet Group"
              options={FLEET_GROUP_OPTIONS}
              selectedValue={formData.fleetGroup}
              onSelect={(val) => handleDropdownSelect("fleetGroup", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 border py-2 text-white ${
                errors.fleetGroup ? "border-red-500" : "border-[#27272a]"
              }`}
            />
            {errors.fleetGroup && <p className="text-red-500 text-[9px] mt-0.5">{errors.fleetGroup}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Operating Region</label>
              <MainDropDown
                label="Select Operating Region"
                options={OPERATING_REGION_OPTIONS}
                selectedValue={formData.operatingRegion}
                onSelect={(val) => handleDropdownSelect("operatingRegion", val)}
                className={`w-full justify-between rounded-xl bg-[#18181b]/60 border py-2 text-white ${
                  errors.operatingRegion ? "border-red-500" : "border-[#27272a]"
                }`}
              />
              {errors.operatingRegion && <p className="text-red-500 text-[9px] mt-0.5">{errors.operatingRegion}</p>}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Depot / Warehouse</label>
              <MainDropDown
                label="Select Depot / Warehouse"
                options={DEPOT_WAREHOUSE_OPTIONS}
                selectedValue={formData.depotWarehouse}
                onSelect={(val) => handleDropdownSelect("depotWarehouse", val)}
                className={`w-full justify-between rounded-xl bg-[#18181b]/60 border py-2 text-white ${
                  errors.depotWarehouse ? "border-red-500" : "border-[#27272a]"
                }`}
              />
              {errors.depotWarehouse && <p className="text-red-500 text-[9px] mt-0.5">{errors.depotWarehouse}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Business Unit</label>
            <input
              type="text"
              name="businessUnit"
              placeholder="Enter Business Unit"
              value={formData.businessUnit}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none transition-all ${
                errors.businessUnit ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.businessUnit && <p className="text-red-500 text-[9px] mt-0.5">{errors.businessUnit}</p>}
          </div>

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