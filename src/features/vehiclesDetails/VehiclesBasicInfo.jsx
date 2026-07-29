import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Ui/DropDown";
import { patchVehicle } from "../../services/vehicleService";
import { toast } from "../../components/Ui/toast";

// Dropdown Options
const VEHICLE_TYPE_OPTIONS = [
  { label: "Heavy Truck", value: "Heavy Truck" },
  { label: "Trailer", value: "Trailer" },
];

const MANUFACTURER_OPTIONS = [
  { label: "Tata Motors", value: "Tata Motors" },
  { label: "Ashok Leyland", value: "Ashok Leyland" },
];

const CAPACITY_OPTIONS = [
  { label: "12 Tons", value: "12 Tons" },
  { label: "16 Tons", value: "16 Tons" },
];

const FUEL_TYPE_OPTIONS = [
  { label: "Diesel", value: "Diesel" },
  { label: "Electric", value: "Electric" },
];

export default function VehiclesBasicInfo({ onNext, onCancel, uniqueId, onSaved, selectedVehicle }) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedVehicle) {
      const vehicleNumber =
        selectedVehicle?.plate ||
        selectedVehicle?.vehicleNumber ||
        selectedVehicle?.raw?.vehicle_number ||
        selectedVehicle?.raw?.vehicleNumber ||
        "";

      setFormData((prev) => ({
        ...prev,
        vehicleNumber,
        vehicleType: "Heavy Truck",
        manufacturer: "Tata Motors",
        model: "Model X",
        color: "White",
        capacity: "12 Tons",
        fuelType: "Diesel",
        fleet: "Main Fleet",
      }));
    }
  }, [selectedVehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Helper function for Custom Dropdowns
  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    // const newErrors = {};
    // if (!formData.vehicleNumber.trim()) {
    //   newErrors.vehicleNumber = "Vehicle Number is required";
    // }
    // if (!formData.vehicleType) {
    //   newErrors.vehicleType = "Select Vehicle Type";
    // }
    // if (!formData.manufacturer) {
    //   newErrors.manufacturer = "Select Manufacturer";
    // }
    // if (!formData.model.trim()) {
    //   newErrors.model = "Model is required";
    // }
    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
    return true; // Skip validation
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!uniqueId) {
      toast.error("No vehicle selected");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        vehicle_number: formData.vehicleNumber.trim(),
        vehicle_type: formData.vehicleType,
        manufacturer: formData.manufacturer,
        model: formData.model.trim(),
        color: formData.color.trim(),
        capacity: formData.capacity,
        fuel_type: formData.fuelType,
        fleet_group: formData.fleet.trim(),
      };

      await patchVehicle(uniqueId, payload);
      toast.success("Vehicle updated successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update vehicle", error);
      toast.error(error?.message || "Failed to update vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none">
      
      {/* Header (Without Cross Button) */}
      <div className="pb-3 mb-2 border-b border-[#1d1d20]/60">
        <h2 className="text-[14px] font-bold text-white tracking-tight">
          Basic Information
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-2.5 text-[10.5px]">
        
        {/* Row 1: Vehicle Number & Vehicle Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Enter Vehicle Number"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${errors.vehicleNumber ? "border-rose-500" : "border-[#27272a]"} focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.vehicleNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleNumber}</p>}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Vehicle Type</label>
            <Dropdown
              label="Select Vehicle Type"
              options={VEHICLE_TYPE_OPTIONS}
              selectedValue={formData.vehicleType}
              onSelect={(val) => handleDropdownSelect("vehicleType", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${errors.vehicleType ? "border-rose-500" : "border-[#27272a]"} py-1.5 px-3 text-white`}
            />
            {errors.vehicleType && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleType}</p>}
          </div>
        </div>

        {/* Row 2: Manufacturer & Model */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Manufacturer</label>
            <Dropdown
              label="Select Manufacturer Name"
              options={MANUFACTURER_OPTIONS}
              selectedValue={formData.manufacturer}
              onSelect={(val) => handleDropdownSelect("manufacturer", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${errors.manufacturer ? "border-rose-500" : "border-[#27272a]"} py-1.5 px-3 text-white`}
            />
            {errors.manufacturer && <p className="text-red-500 text-[9px] mt-0.5">{errors.manufacturer}</p>}
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter Model"
              value={formData.model}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${errors.model ? "border-rose-500" : "border-[#27272a]"} focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.model && <p className="text-red-500 text-[9px] mt-0.5">{errors.model}</p>}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Color</label>
          <input
            type="text"
            name="color"
            placeholder="Enter Color"
            value={formData.color}
            onChange={handleChange}
            className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
          />
        </div>

        {/* Row 3: Capacity & Fuel Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Capacity (Ton)</label>
            <Dropdown
              label="Enter Capacity (Ton)"
              options={CAPACITY_OPTIONS}
              selectedValue={formData.capacity}
              onSelect={(val) => handleDropdownSelect("capacity", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>

          <div>
            <label className="block text-[#a1a1aa] mb-1 font-medium">Fuel Type</label>
            <Dropdown
              label="Enter Fuel Type"
              options={FUEL_TYPE_OPTIONS}
              selectedValue={formData.fuelType}
              onSelect={(val) => handleDropdownSelect("fuelType", val)}
              className="w-full justify-between rounded-xl bg-[#18181b]/60 border-[#27272a] py-1.5 px-3 text-white"
            />
          </div>
        </div>

        {/* Fleet */}
        <div>
          <label className="block text-[#a1a1aa] mb-1 font-medium">Fleet</label>
          <input
            type="text"
            name="fleet"
            placeholder="Enter West Fleet"
            value={formData.fleet}
            onChange={handleChange}
            className="w-full bg-[#18181b]/60 border border-[#27272a] focus:border-[#ffd60a] rounded-xl px-3 py-1.5 text-white placeholder-[#52525b] focus:outline-none transition-all"
          />
        </div>

        {/* Action Buttons */}
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
            disabled={isSubmitting}
            className="w-full py-2 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Next"}
          </button>
        </div>

      </form>
    </div>
  );
}