import React, { useState } from "react";
import { toast } from "../../components/Ui/toast";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

const NETWORK_PROVIDER_OPTIONS = [
  { label: "Airtel", value: "Airtel" },
  { label: "Jio", value: "Jio" },
  { label: "Vodafone Idea", value: "Vodafone Idea" },
];

export default function GPSDeviceInfo({ onNext, onCancel, uniqueId, onSaved, selectedVehicle }) {
  const [formData, setFormData] = useState({
    trackerId: "",
    imeiNumber: "",
    simNumber: "",
    networkProvider: "",
    firmware: "",
    gpsStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.trackerId?.trim()) {
      newErrors.trackerId = "Tracker ID is required";
    }

    if (!formData.imeiNumber?.trim()) {
      newErrors.imeiNumber = "IMEI number is required";
    } else if (!/^[0-9]{15}$/.test(formData.imeiNumber.trim())) {
      newErrors.imeiNumber = "Enter valid 15-digit IMEI number";
    }

    if (!formData.simNumber?.trim()) {
      newErrors.simNumber = "SIM number is required";
    }

    if (!formData.networkProvider?.trim()) {
      newErrors.networkProvider = "Network provider is required";
    }

    if (!formData.firmware?.trim()) {
      newErrors.firmware = "Firmware version is required";
    }

    if (!formData.gpsStatus?.trim()) {
      newErrors.gpsStatus = "GPS status is required";
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
      toast.success("GPS device information saved successfully");
      if (onSaved) onSaved();
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to update GPS details", error);
      toast.error(error?.message || "Failed to save GPS details");
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
          GPS & Device Information
        </MainLayoutColor>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Tracker ID & IMEI Number */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Tracker ID <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="trackerId"
              placeholder="e.g. TRK-99012"
              value={formData.trackerId}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.trackerId ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.trackerId && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.trackerId}
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
              IMEI Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="imeiNumber"
              placeholder="15-digit IMEI"
              value={formData.imeiNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.imeiNumber ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.imeiNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.imeiNumber}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: SIM Number & Network Provider */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              SIM Number <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="simNumber"
              placeholder="e.g. 899123456789"
              value={formData.simNumber}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.simNumber ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.simNumber && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.simNumber}
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
              Network Provider <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <MainDropDown
              label="Select Provider"
              options={NETWORK_PROVIDER_OPTIONS}
              selectedValue={formData.networkProvider}
              onSelect={(val) => handleDropdownSelect("networkProvider", val)}
              className={`w-full justify-between rounded-xl bg-[#18181b]/60 ${
                errors.networkProvider ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } py-1.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]`}
            />
            {errors.networkProvider && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.networkProvider}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Firmware & GPS Status */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block mb-1 font-medium"
            >
              Firmware Version <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="firmware"
              placeholder="e.g. v2.4.1"
              value={formData.firmware}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.firmware ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.firmware && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.firmware}
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
              GPS Status <span className="text-rose-500">*</span>
            </MainLayoutColor>
            <input
              type="text"
              name="gpsStatus"
              placeholder="e.g. Online / Inactive"
              value={formData.gpsStatus}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/60 border ${
                errors.gpsStatus ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
              } focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-1.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all`}
            />
            {errors.gpsStatus && (
              <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                {errors.gpsStatus}
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