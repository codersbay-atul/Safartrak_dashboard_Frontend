import React, { useEffect, useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

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

export default function VehiclesBasicInfo({
  onNext,
  onCancel,
  uniqueId,
  onSaved,
  selectedVehicle,
}) {
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
      setFormData({
        vehicleNumber:
          selectedVehicle?.plate ||
          selectedVehicle?.vehicleNumber ||
          selectedVehicle?.raw?.vehicle_number ||
          selectedVehicle?.raw?.vehicleNumber ||
          "",
        vehicleType: selectedVehicle?.type || selectedVehicle?.vehicleType || "",
        manufacturer: selectedVehicle?.manufacturer || "",
        model: selectedVehicle?.model || "",
        color: selectedVehicle?.color || "",
        capacity: selectedVehicle?.capacity || "",
        fuelType: selectedVehicle?.fuelType || "",
        fleet: selectedVehicle?.fleet || "",
      });
    }
  }, [selectedVehicle]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicleNumber?.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }
    if (!formData.vehicleType?.trim()) {
      newErrors.vehicleType = "Vehicle type is required";
    }
    if (!formData.manufacturer?.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
    }
    if (!formData.model?.trim()) {
      newErrors.model = "Model name is required";
    }
    if (!formData.color?.trim()) {
      newErrors.color = "Color is required";
    }
    if (!formData.capacity?.trim()) {
      newErrors.capacity = "Capacity is required";
    }
    if (!formData.fuelType?.trim()) {
      newErrors.fuelType = "Fuel type is required";
    }
    if (!formData.fleet?.trim()) {
      newErrors.fleet = "Fleet group is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!uniqueId) {
      toast.error("No vehicle selected");
      return;
    }

    try {
      setIsSubmitting(true);
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
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full max-w-[480px] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col overflow-visible select-none font-sans"
    >
      {/* Header */}
      <div className="pb-3 mb-2 border-b border-[#27272a]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Basic Information
        </MainLayoutColor>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Vehicle Number & Vehicle Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Vehicle Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="e.g. MH14AB1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.vehicleNumber ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.vehicleNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.vehicleNumber}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Vehicle Type <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Vehicle Type"
              options={VEHICLE_TYPE_OPTIONS}
              selectedValue={formData.vehicleType}
              onSelect={(val) => handleDropdownSelect("vehicleType", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.vehicleType ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.vehicleType && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.vehicleType}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Manufacturer & Model */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Manufacturer <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Manufacturer"
              options={MANUFACTURER_OPTIONS}
              selectedValue={formData.manufacturer}
              onSelect={(val) => handleDropdownSelect("manufacturer", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.manufacturer ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.manufacturer && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.manufacturer}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Model <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="model"
              placeholder="e.g. Prima 5530"
              value={formData.model}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.model ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.model && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.model}
              </p>
            )}
          </div>
        </div>

        {/* Color */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Color <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <input
            type="text"
            name="color"
            placeholder="e.g. White / Yellow"
            value={formData.color}
            onChange={handleChange}
            className={`w-full bg-[#18181b]/60 border ${
              errors.color ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
            } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
          />
          {errors.color && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.color}
            </p>
          )}
        </div>

        {/* Row 3: Capacity & Fuel Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Capacity (Ton) <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Capacity"
              options={CAPACITY_OPTIONS}
              selectedValue={formData.capacity}
              onSelect={(val) => handleDropdownSelect("capacity", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.capacity ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.capacity && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.capacity}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Fuel Type <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Fuel Type"
              options={FUEL_TYPE_OPTIONS}
              selectedValue={formData.fuelType}
              onSelect={(val) => handleDropdownSelect("fuelType", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.fuelType ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.fuelType && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.fuelType}
              </p>
            )}
          </div>
        </div>

        {/* Fleet */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Fleet Group <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <input
            type="text"
            name="fleet"
            placeholder="e.g. West Fleet"
            value={formData.fleet}
            onChange={handleChange}
            className={`w-full bg-[#18181b]/60 border ${
              errors.fleet ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
            } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
          />
          {errors.fleet && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.fleet}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2.5 mt-2 border-t border-[#27272a]">
          {/* Cancel Button */}
          <MainHeaderActionButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none">
              Cancel
            </span>
          </MainHeaderActionButton>

          {/* Submit / Next Button */}
          <MainHeaderActionButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2 rounded-xl text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[var(--color-yellow-hover,#e6c200)] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-60 shadow-md shadow-[var(--color-yellow,#ffd60a)]/10"
          >
            <span className="text-[14px] font-medium text-black whitespace-nowrap leading-none">
              {isSubmitting ? "Saving..." : "Next"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}