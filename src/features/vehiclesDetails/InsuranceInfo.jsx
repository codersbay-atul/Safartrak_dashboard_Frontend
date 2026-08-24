import React, { useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

// Dropdown Options
const COVERAGE_TYPE_OPTIONS = [
  { label: "Comprehensive", value: "Comprehensive" },
  { label: "Third Party", value: "Third Party" },
  { label: "Zero Depreciation", value: "Zero Depreciation" },
];

const CLAIM_STATUS_OPTIONS = [
  { label: "No Inactive Claim", value: "No Inactive Claim" },
  { label: "Claim Pending", value: "Claim Pending" },
  { label: "Claim Approved", value: "Claim Approved" },
];

export default function InsuranceInfo({ onNext, onCancel, uniqueId, onSaved, selectedVehicle }) {
  const [formData, setFormData] = useState({
    insuranceProvider: "",
    policyNumber: "",
    coverageType: "",
    insuranceExpiry: "",
    claimStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.insuranceProvider?.trim()) {
      newErrors.insuranceProvider = "Insurance provider is required";
    }

    if (!formData.policyNumber?.trim()) {
      newErrors.policyNumber = "Policy number is required";
    }

    if (!formData.coverageType?.trim()) {
      newErrors.coverageType = "Coverage type is required";
    }

    if (!formData.insuranceExpiry) {
      newErrors.insuranceExpiry = "Insurance expiry date is required";
    }

    if (!formData.claimStatus?.trim()) {
      newErrors.claimStatus = "Claim status is required";
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
      toast.success("Insurance details saved successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update insurance details", error);
      toast.error(error?.message || "Failed to save insurance details");
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
          Insurance Information
        </MainLayoutColor>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Insurance Provider & Policy Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Insurance Provider <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="insuranceProvider"
              placeholder="Enter Insurance Provider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.insuranceProvider ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium placeholder-[#A8A8A8] focus:outline-none transition-all`}
            />
            {errors.insuranceProvider && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.insuranceProvider}
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
              Policy Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="policyNumber"
              placeholder="Enter Policy Number"
              value={formData.policyNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.policyNumber ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium placeholder-[#A8A8A8] focus:outline-none transition-all`}
            />
            {errors.policyNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.policyNumber}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Coverage Type & Insurance Expiry */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium text-[12px]"
            >
              Coverage Type <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Coverage Type"
              options={COVERAGE_TYPE_OPTIONS}
              selectedValue={formData.coverageType}
              onSelect={(val) => handleDropdownSelect("coverageType", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.coverageType ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-2 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.coverageType && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.coverageType}
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
              Insurance Expiry <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="date"
              name="insuranceExpiry"
              value={formData.insuranceExpiry}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.insuranceExpiry ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2 text-white text-[12px] font-medium focus:outline-none transition-all [color-scheme:dark] placeholder-[#A8A8A8]`}
            />
            {errors.insuranceExpiry && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.insuranceExpiry}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Claim Status */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium text-[12px]"
          >
            Claim Status <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <MainDropDown
            label="Select Claim Status"
            options={CLAIM_STATUS_OPTIONS}
            selectedValue={formData.claimStatus}
            onSelect={(val) => handleDropdownSelect("claimStatus", val)}
            className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
              errors.claimStatus ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
            } py-2 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
          />
          {errors.claimStatus && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.claimStatus}
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