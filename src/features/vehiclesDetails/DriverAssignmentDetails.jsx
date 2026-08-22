import React, { useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

const SHIFT_OPTIONS = [
  { label: "Day Shift", value: "Day Shift" },
  { label: "Night Shift", value: "Night Shift" },
];

export default function DriverAssignmentDetails({ onNext, onCancel, uniqueId, onSaved, selectedVehicle }) {
  const [formData, setFormData] = useState({
    assignedDriver: "",
    driverPhone: "",
    licenseNumber: "",
    currentRoute: "",
    shift: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.assignedDriver?.trim()) {
      newErrors.assignedDriver = "Assigned Driver is required";
    }

    if (!formData.driverPhone?.trim()) {
      newErrors.driverPhone = "Driver Phone is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.driverPhone.replace(/\s+/g, ""))) {
      newErrors.driverPhone = "Enter valid phone number";
    }

    if (!formData.licenseNumber?.trim()) {
      newErrors.licenseNumber = "License Number is required";
    }

    if (!formData.currentRoute?.trim()) {
      newErrors.currentRoute = "Current Route is required";
    }

    if (!formData.shift?.trim()) {
      newErrors.shift = "Please select a shift";
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.success("Driver assignment saved successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update driver details", error);
      toast.error(error?.message || "Failed to save driver details");
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
      {/* Header (14px Section Title) */}
      <div className="pb-3 mb-2 border-b border-[#27272a]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Driver Assignment
        </MainLayoutColor>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Assigned Driver & Driver Phone */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Assigned Driver <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="assignedDriver"
              placeholder="e.g. Rahul Sharma"
              value={formData.assignedDriver}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.assignedDriver ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.assignedDriver && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.assignedDriver}
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
              Driver Phone <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="driverPhone"
              placeholder="e.g. +91 9876543210"
              value={formData.driverPhone}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.driverPhone ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.driverPhone && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.driverPhone}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: License Number & Current Route */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              License Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="licenseNumber"
              placeholder="e.g. DL-1420110012345"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.licenseNumber ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.licenseNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.licenseNumber}
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
              Current Route <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="currentRoute"
              placeholder="e.g. Delhi to Mumbai"
              value={formData.currentRoute}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.currentRoute ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.currentRoute && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.currentRoute}
              </p>
            )}
          </div>
        </div>

        {/* Shift */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Shift <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <MainDropDown
            label="Select Shift"
            options={SHIFT_OPTIONS}
            selectedValue={formData.shift}
            onSelect={(val) => handleDropdownSelect("shift", val)}
            className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
              errors.shift ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
            } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
          />
          {errors.shift && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.shift}
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
            disabled={isSubmitting}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
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
            className="w-full py-2 rounded-xl text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[var(--color-yellow-hover,#e6c200)] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[var(--color-yellow,#ffd60a)]/10"
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