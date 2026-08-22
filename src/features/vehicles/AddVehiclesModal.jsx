import React, { useState } from "react";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const VEHICLE_TYPE_OPTIONS = [
  { label: "Truck", value: "Truck" },
  { label: "Van", value: "Van" },
  { label: "Car", value: "Car" },
];

const MANUFACTURER_OPTIONS = [
  { label: "Tata", value: "Tata" },
  { label: "Ashok Leyland", value: "Ashok Leyland" },
  { label: "Mahindra", value: "Mahindra" },
];

const MANUFACTURING_YEAR_OPTIONS = [
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];

const FUEL_TYPE_OPTIONS = [
  { label: "Diesel", value: "Diesel" },
  { label: "Petrol", value: "Petrol" },
  { label: "Electric", value: "Electric" },
];

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

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[480px] max-h-[90vh] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col font-sans overflow-hidden"
      >
        {/* 14px Modal Header */}
        <div className="pb-2.5 mb-2 border-b border-[#1d1d20]/60 shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block"
          >
            Add Vehicle
          </MainLayoutColor>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Vehicle Number
                </MainLayoutColor>
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Enter Vehicle Number"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.vehicleNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                />
                {errors.vehicleNumber && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.vehicleNumber}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Registration Number
                </MainLayoutColor>
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Enter Registration Number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.registrationNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.registrationNumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Vehicle Type
                </MainLayoutColor>
                <MainDropDown
                  label="Enter Vehicle Type"
                  options={VEHICLE_TYPE_OPTIONS}
                  selectedValue={formData.vehicleType}
                  onSelect={(val) => handleDropdownSelect("vehicleType", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.vehicleType ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.vehicleType && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.vehicleType}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Manufacturer
                </MainLayoutColor>
                <MainDropDown
                  label="Enter Manufacturer Name"
                  options={MANUFACTURER_OPTIONS}
                  selectedValue={formData.manufacturer}
                  onSelect={(val) => handleDropdownSelect("manufacturer", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.manufacturer ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.manufacturer && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.manufacturer}</p>
                )}
              </div>
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                Model
              </MainLayoutColor>
              <input
                type="text"
                name="model"
                placeholder="Enter Model Number"
                value={formData.model}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.model
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.model && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.model}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Manufacturing Year
                </MainLayoutColor>
                <MainDropDown
                  label="Enter Manufacturing Year"
                  options={MANUFACTURING_YEAR_OPTIONS}
                  selectedValue={formData.manufacturingYear}
                  onSelect={(val) => handleDropdownSelect("manufacturingYear", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.manufacturingYear ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.manufacturingYear && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.manufacturingYear}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Fuel Type
                </MainLayoutColor>
                <MainDropDown
                  label="Enter Fuel Type"
                  options={FUEL_TYPE_OPTIONS}
                  selectedValue={formData.fuelType}
                  onSelect={(val) => handleDropdownSelect("fuelType", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.fuelType ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.fuelType && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.fuelType}</p>
                )}
              </div>
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                Vehicle Capacity
              </MainLayoutColor>
              <input
                type="text"
                name="vehicleCapacity"
                placeholder="Enter Vehicle Capacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.vehicleCapacity
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.vehicleCapacity && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.vehicleCapacity}</p>
              )}
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                Chassis Number
              </MainLayoutColor>
              <input
                type="text"
                name="chassisNumber"
                placeholder="Enter Chassis Number"
                value={formData.chassisNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.chassisNumber
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.chassisNumber && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.chassisNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Engine Number
                </MainLayoutColor>
                <input
                  type="text"
                  name="engineNumber"
                  placeholder="Enter Engine Number"
                  value={formData.engineNumber}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.engineNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                />
                {errors.engineNumber && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.engineNumber}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Vehicle Color
                </MainLayoutColor>
                <input
                  type="text"
                  name="vehicleColor"
                  placeholder="Enter Vehicle color"
                  value={formData.vehicleColor}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.vehicleColor
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                />
                {errors.vehicleColor && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.vehicleColor}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons using headerButtonText */}
          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#1d1d20] shrink-0">
            <MainLayoutButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-full justify-center py-2"
            >
              <MainLayoutTextSize size="headerButtonText">
                Cancel
              </MainLayoutTextSize>
            </MainLayoutButton>
            
            <MainLayoutButton
              type="submit"
              variant="primary"
              className="w-full justify-center py-2"
            >
              <MainLayoutTextSize size="headerButtonText">
                Next
              </MainLayoutTextSize>
            </MainLayoutButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}