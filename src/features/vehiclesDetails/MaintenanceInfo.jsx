import React, { useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

// Dropdown Options
const MAINTENANCE_INTERVAL_OPTIONS = [
  { label: "Every 5,000 km", value: "Every 5,000 km" },
  { label: "Every 10,000 km", value: "Every 10,000 km" },
  { label: "Every 6 Months", value: "Every 6 Months" },
  { label: "Every 1 Year", value: "Every 1 Year" },
];

export default function MaintenanceInfo({ onNext, onCancel, uniqueId, onSaved, selectedVehicle }) {
  const [formData, setFormData] = useState({
    lastServiceDate: "",
    nextServiceDue: "",
    currentOdometer: "",
    engineHour: "",
    maintenanceInterval: "",
    preferredWorkshop: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastServiceDate) {
      newErrors.lastServiceDate = "Last service date is required";
    }

    if (!formData.nextServiceDue) {
      newErrors.nextServiceDue = "Next service due date is required";
    }

    if (!formData.currentOdometer?.trim()) {
      newErrors.currentOdometer = "Current odometer reading is required";
    }

    if (!formData.engineHour?.trim()) {
      newErrors.engineHour = "Engine hours are required";
    }

    if (!formData.maintenanceInterval?.trim()) {
      newErrors.maintenanceInterval = "Maintenance interval is required";
    }

    if (!formData.preferredWorkshop?.trim()) {
      newErrors.preferredWorkshop = "Preferred workshop is required";
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
      toast.success("Maintenance details saved successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update maintenance details", error);
      toast.error(error?.message || "Failed to save maintenance details");
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
          className="font-medium tracking-tight block text-[14px]"
        >
          Maintenance Information
        </MainLayoutColor>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Last Service Date & Next Service Due */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Last Service Date <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="date"
              name="lastServiceDate"
              value={formData.lastServiceDate}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.lastServiceDate ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium focus:outline-none transition-all [color-scheme:dark] placeholder-[#A8A8A8]`}
            />
            {errors.lastServiceDate && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.lastServiceDate}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Next Service Due <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="date"
              name="nextServiceDue"
              value={formData.nextServiceDue}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.nextServiceDue ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium focus:outline-none transition-all [color-scheme:dark] placeholder-[#A8A8A8]`}
            />
            {errors.nextServiceDue && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.nextServiceDue}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Current Odometer & Engine Hour */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Current Odometer <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="currentOdometer"
              placeholder="Enter Odometer Reading"
              value={formData.currentOdometer}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.currentOdometer ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium placeholder-[#A8A8A8] focus:outline-none transition-all`}
            />
            {errors.currentOdometer && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.currentOdometer}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Engine Hour <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="engineHour"
              placeholder="Enter Engine Hours"
              value={formData.engineHour}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.engineHour ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium placeholder-[#A8A8A8] focus:outline-none transition-all`}
            />
            {errors.engineHour && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.engineHour}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Maintenance Interval & Preferred Workshop */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Maintenance Interval <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Interval"
              options={MAINTENANCE_INTERVAL_OPTIONS}
              selectedValue={formData.maintenanceInterval}
              onSelect={(val) => handleDropdownSelect("maintenanceInterval", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.maintenanceInterval ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-2 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.maintenanceInterval && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.maintenanceInterval}
              </p>
            )}
          </div>

          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Preferred Workshop <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="preferredWorkshop"
              placeholder="Enter Workshop Name"
              value={formData.preferredWorkshop}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.preferredWorkshop ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium placeholder-[#A8A8A8] focus:outline-none transition-all`}
            />
            {errors.preferredWorkshop && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.preferredWorkshop}
              </p>
            )}
          </div>
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
            className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
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
            className="w-full py-2.5 rounded-xl text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[#e6c200] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[var(--color-yellow,#ffd60a)]/10"
          >
            <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
              {isSubmitting ? "Saving..." : "Next"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}