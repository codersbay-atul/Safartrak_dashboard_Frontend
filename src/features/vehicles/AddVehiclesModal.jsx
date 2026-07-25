import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Button from "../../components/Ui/Button";

export default function AddVehicleModal({ isOpen, onClose, onNext }) {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    registrationNumber: "",
    vehicleType: "",
    manufacturer: "",
    model: "",
    manufacturingYear: "",
    fuelType: "",
    vehicleCapacity: "",
    chassisNumber: "",
    engineNumber: "",
    vehicleColor: "",
  });

  /* -------------------------------------------------------------
     1. VALIDATION ERRORS STATE
  ---------------------------------------------------------------- */
  // const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    /* -------------------------------------------------------------
       2. CLEAR ERROR ON INPUT CHANGE 
    ---------------------------------------------------------------- */
    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: "" }));
    // }
  };

  /* -------------------------------------------------------------
     3. VALIDATION FUNCTION 
  ---------------------------------------------------------------- */
  /*
  const validateForm = () => {
    let newErrors = {};

    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle Number is required";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration Number is required";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle Type is required";
    if (!formData.manufacturer) newErrors.manufacturer = "Manufacturer is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.manufacturingYear) newErrors.manufacturingYear = "Manufacturing Year is required";
    if (!formData.fuelType) newErrors.fuelType = "Fuel Type is required";
    if (!formData.vehicleCapacity.trim()) newErrors.vehicleCapacity = "Vehicle Capacity is required";
    if (!formData.chassisNumber.trim()) newErrors.chassisNumber = "Chassis Number is required";
    if (!formData.engineNumber.trim()) newErrors.engineNumber = "Engine Number is required";
    if (!formData.vehicleColor.trim()) newErrors.vehicleColor = "Vehicle Color is required";

    setErrors(newErrors);

    
    return Object.keys(newErrors).length === 0;
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* -------------------------------------------------------------
       4. CHECK VALIDATION BEFORE NEXT PAGE 
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
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1d1d20]/60">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            Add Vehicle
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-[10.5px]">
          
          {/* Row 1: Vehicle Number & Registration Number */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Enter Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
              {/* {errors.vehicleNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleNumber}</p>} */}
            </div>
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Enter Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
              {/* {errors.registrationNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.registrationNumber}</p>} */}
            </div>
          </div>

          {/* Row 2: Vehicle Type & Manufacturer */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Vehicle Type</label>
              <div className="relative">
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-[#ffd60a] cursor-pointer"
                >
                  <option value="" disabled className="text-[#52525b]">Enter Vehicle Type</option>
                  <option value="Truck" className="bg-[#121214]">Truck</option>
                  <option value="Van" className="bg-[#121214]">Van</option>
                  <option value="Car" className="bg-[#121214]">Car</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.vehicleType && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleType}</p>} */}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Manufacturer</label>
              <div className="relative">
                <select
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-[#ffd60a] cursor-pointer"
                >
                  <option value="" disabled className="text-[#52525b]">Enter Manufacturer Name</option>
                  <option value="Tata" className="bg-[#121214]">Tata</option>
                  <option value="Ashok Leyland" className="bg-[#121214]">Ashok Leyland</option>
                  <option value="Mahindra" className="bg-[#121214]">Mahindra</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.manufacturer && <p className="text-red-500 text-[9px] mt-0.5">{errors.manufacturer}</p>} */}
            </div>
          </div>

          {/* Row 3: Model */}
          <div>
            <label className="block text-[#a1a1aa] mb-0.5 font-medium">Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter Model Number"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
            />
            {/* {errors.model && <p className="text-red-500 text-[9px] mt-0.5">{errors.model}</p>} */}
          </div>

          {/* Row 4: Manufacturing Year & Fuel Type */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Manufacturing Year</label>
              <div className="relative">
                <select
                  name="manufacturingYear"
                  value={formData.manufacturingYear}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-[#ffd60a] cursor-pointer"
                >
                  <option value="" disabled className="text-[#52525b]">Enter Manufacturing Year</option>
                  <option value="2026" className="bg-[#121214]">2026</option>
                  <option value="2025" className="bg-[#121214]">2025</option>
                  <option value="2024" className="bg-[#121214]">2024</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.manufacturingYear && <p className="text-red-500 text-[9px] mt-0.5">{errors.manufacturingYear}</p>} */}
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Fuel Type</label>
              <div className="relative">
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-[#ffd60a] cursor-pointer"
                >
                  <option value="" disabled className="text-[#52525b]">Enter Fuel Type</option>
                  <option value="Diesel" className="bg-[#121214]">Diesel</option>
                  <option value="Petrol" className="bg-[#121214]">Petrol</option>
                  <option value="Electric" className="bg-[#121214]">Electric</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
              {/* {errors.fuelType && <p className="text-red-500 text-[9px] mt-0.5">{errors.fuelType}</p>} */}
            </div>
          </div>

          {/* Row 5: Vehicle Capacity */}
          <div>
            <label className="block text-[#a1a1aa] mb-0.5 font-medium">Vehicle Capacity</label>
            <input
              type="text"
              name="vehicleCapacity"
              placeholder="Enter Vehicle Capacity"
              value={formData.vehicleCapacity}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
            />
            {/* {errors.vehicleCapacity && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleCapacity}</p>} */}
          </div>

          {/* Row 6: Chassis Number */}
          <div>
            <label className="block text-[#a1a1aa] mb-0.5 font-medium">Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              placeholder="Enter Chassis Number"
              value={formData.chassisNumber}
              onChange={handleChange}
              className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
            />
            {/* {errors.chassisNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.chassisNumber}</p>} */}
          </div>

          {/* Row 7: Engine Number & Vehicle Color */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Engine Number</label>
              <input
                type="text"
                name="engineNumber"
                placeholder="Enter Engine Number"
                value={formData.engineNumber}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
              {/* {errors.engineNumber && <p className="text-red-500 text-[9px] mt-0.5">{errors.engineNumber}</p>} */}
            </div>
            <div>
              <label className="block text-[#a1a1aa] mb-0.5 font-medium">Vehicle Color</label>
              <input
                type="text"
                name="vehicleColor"
                placeholder="Enter Vehicle color"
                value={formData.vehicleColor}
                onChange={handleChange}
                className="w-full bg-[#18181b]/60 border border-[#27272a] rounded-lg px-2.5 py-1 text-white placeholder-[#52525b] focus:outline-none focus:border-[#ffd60a] transition-all"
              />
              {/* {errors.vehicleColor && <p className="text-red-500 text-[9px] mt-0.5">{errors.vehicleColor}</p>} */}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-[#1d1d20]">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold bg-[#27272a]/60 hover:bg-[#27272a] text-[#d4d4d8] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="primary"
              className="w-full py-1.5 rounded-lg text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200]"
            >
              Next
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}