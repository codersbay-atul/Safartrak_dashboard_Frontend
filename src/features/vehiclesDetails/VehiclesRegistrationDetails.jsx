import React, { useEffect, useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

// Dropdown Options
const PERMIT_TYPE_OPTIONS = [
  { label: "National Permit", value: "National Permit" },
  { label: "State Permit", value: "State Permit" },
];

export default function VehiclesRegistrationDetails({
  onNext,
  onCancel,
  uniqueId,
  selectedVehicle,
  onSaved,
}) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vinNumber: "",
    engineNumber: "",
    chassisNumber: "",
    rcExpiry: "",
    permitType: "",
    permitExpiry: "",
    fitnessCertificate: "",
    pollutionExpiry: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        registrationNumber:
          selectedVehicle?.plate ||
          selectedVehicle?.vehicleNumber ||
          selectedVehicle?.raw?.registration_no ||
          "",
        vinNumber: selectedVehicle?.vinNumber || selectedVehicle?.raw?.vin_number || "",
        engineNumber: selectedVehicle?.engineNumber || selectedVehicle?.raw?.engine_number || "",
        chassisNumber: selectedVehicle?.chassisNumber || selectedVehicle?.raw?.chassis_no || "",
        rcExpiry: selectedVehicle?.rcExpiry || "",
        permitType: selectedVehicle?.permitType || "National Permit",
        permitExpiry: selectedVehicle?.permitExpiry || "",
        fitnessCertificate: selectedVehicle?.fitnessCertificate || "",
        pollutionExpiry: selectedVehicle?.pollutionExpiry || "",
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

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.registrationNumber?.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }

    if (!formData.vinNumber?.trim()) {
      newErrors.vinNumber = "VIN number is required";
    }

    if (!formData.engineNumber?.trim()) {
      newErrors.engineNumber = "Engine number is required";
    }

    if (!formData.chassisNumber?.trim()) {
      newErrors.chassisNumber = "Chassis number is required";
    }

    if (!formData.rcExpiry) {
      newErrors.rcExpiry = "RC expiry date is required";
    }

    if (!formData.permitType?.trim()) {
      newErrors.permitType = "Permit type is required";
    }

    if (!formData.permitExpiry) {
      newErrors.permitExpiry = "Permit expiry date is required";
    }

    if (!formData.fitnessCertificate?.trim()) {
      newErrors.fitnessCertificate = "Fitness certificate is required";
    }

    if (!formData.pollutionExpiry) {
      newErrors.pollutionExpiry = "PUC expiry date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!uniqueId) {
      toast.error("No vehicle selected");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.success("Registration details updated successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update registration details", error);
      toast.error(error?.message || "Failed to update registration details");
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
          Registration Details
        </MainLayoutColor>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-3">
        {/* Row 1: Registration Number & VIN Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Registration Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="registrationNumber"
              placeholder="e.g. MH14AB3248"
              value={formData.registrationNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.registrationNumber ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.registrationNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.registrationNumber}
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
              VIN Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="vinNumber"
              placeholder="Enter VIN Number"
              value={formData.vinNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.vinNumber ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.vinNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.vinNumber}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Engine Number & Chassis Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Engine Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="engineNumber"
              placeholder="Enter Engine Number"
              value={formData.engineNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.engineNumber ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.engineNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.engineNumber}
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
              Chassis Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="chassisNumber"
              placeholder="Enter Chassis Number"
              value={formData.chassisNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.chassisNumber ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.chassisNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.chassisNumber}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: RC Expiry & Permit Type */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              RC Expiry <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="date"
              name="rcExpiry"
              value={formData.rcExpiry}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.rcExpiry ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]`}
            />
            {errors.rcExpiry && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.rcExpiry}
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
              Permit Type <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Permit Type"
              options={PERMIT_TYPE_OPTIONS}
              selectedValue={formData.permitType}
              onSelect={(val) => handleDropdownSelect("permitType", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.permitType ? "border-rose-500" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.permitType && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.permitType}
              </p>
            )}
          </div>
        </div>

        {/* Permit Expiry */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Permit Expiry <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <input
            type="date"
            name="permitExpiry"
            value={formData.permitExpiry}
            onChange={handleChange}
            className={`w-full bg-[#18181b]/60 border ${
              errors.permitExpiry ? "border-rose-500" : "border-[#27272a]"
            } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]`}
          />
          {errors.permitExpiry && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.permitExpiry}
            </p>
          )}
        </div>

        {/* Row 4: Fitness Certificate & Pollution Expiry */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Fitness Certificate <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="fitnessCertificate"
              placeholder="e.g. FC-98765432"
              value={formData.fitnessCertificate}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.fitnessCertificate ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.fitnessCertificate && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.fitnessCertificate}
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
              Pollution Expiry <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="date"
              name="pollutionExpiry"
              value={formData.pollutionExpiry}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.pollutionExpiry ? "border-rose-500" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]`}
            />
            {errors.pollutionExpiry && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.pollutionExpiry}
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
            className="w-full py-2 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
          >
            <span className="text-[14px] font-medium whitespace-nowrap leading-none">
              Cancel
            </span>
          </MainHeaderActionButton>

          {/* Submit / Next Button */}
          <MainHeaderActionButton
            type="submit"
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
              {isSubmitting ? "Loading..." : "Next"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}