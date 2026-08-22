import React, { useState } from "react";
import { Check } from "lucide-react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const NETWORK_PROVIDER_OPTIONS = [
  { label: "Airtel", value: "airtel" },
  { label: "Jio", value: "jio" },
  { label: "Vodafone Idea", value: "vi" },
];

export default function AddGPSDeviceModal({ isOpen, onClose, onNext, onBack }) {
  const [formData, setFormData] = useState({
    gpsDeviceId: "",
    imeiNumber: "",
    simNumber: "",
    networkProvider: "",
    deviceModel: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.gpsDeviceId.trim()) {
      newErrors.gpsDeviceId = "GPS Device ID is required";
    }

    if (!formData.imeiNumber.trim()) {
      newErrors.imeiNumber = "IMEI Number is required";
    } else if (!/^\d{15}$/.test(formData.imeiNumber.trim())) {
      newErrors.imeiNumber = "IMEI must be exactly 15 digits";
    }

    if (!formData.simNumber.trim()) {
      newErrors.simNumber = "SIM Number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.simNumber.replace(/\s+/g, ""))) {
      newErrors.simNumber = "Invalid SIM Number";
    }

    if (!formData.networkProvider) {
      newErrors.networkProvider = "Please select a network provider";
    }

    if (!formData.deviceModel.trim()) {
      newErrors.deviceModel = "Device Model is required";
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
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[480px] max-h-[90vh] border border-[#27272a] rounded-2xl p-4 shadow-2xl flex flex-col font-sans overflow-hidden"
      >
        {/* 14px Header & Badge */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#1d1d20]/60 shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block"
          >
            Add GPS Device
          </MainLayoutColor>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#052e16] border border-[#14532d] text-[#4ade80]">
            <Check size={11} />
            <MainLayoutTextSize size="badgeText" className="font-medium">
              Device Connected
            </MainLayoutTextSize>
          </span>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-2.5">
            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                GPS Device ID
              </MainLayoutColor>
              <input
                type="text"
                name="gpsDeviceId"
                placeholder="Enter GPS Device ID"
                value={formData.gpsDeviceId}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.gpsDeviceId
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.gpsDeviceId && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.gpsDeviceId}</p>
              )}
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                IMEI Number
              </MainLayoutColor>
              <input
                type="text"
                name="imeiNumber"
                placeholder="Enter IMEI Number"
                value={formData.imeiNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.imeiNumber
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.imeiNumber && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.imeiNumber}</p>
              )}
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                SIM Number
              </MainLayoutColor>
              <input
                type="text"
                name="simNumber"
                placeholder="Enter SIM Number"
                value={formData.simNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.simNumber
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.simNumber && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.simNumber}</p>
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
                  Network Provider
                </MainLayoutColor>
                <MainDropDown
                  label="Select Network Provider"
                  options={NETWORK_PROVIDER_OPTIONS}
                  selectedValue={formData.networkProvider}
                  onSelect={(val) => handleDropdownSelect("networkProvider", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.networkProvider ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.networkProvider && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.networkProvider}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Device Model
                </MainLayoutColor>
                <input
                  type="text"
                  name="deviceModel"
                  placeholder="Enter Device Model"
                  value={formData.deviceModel}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.deviceModel
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#ffd60a]"
                  }`}
                />
                {errors.deviceModel && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.deviceModel}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons using headerButtonText */}
          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#1d1d20] shrink-0">
            <MainLayoutButton
              type="button"
              variant="secondary"
              onClick={onBack || onClose}
              className="w-full justify-center py-2"
            >
              <MainLayoutTextSize size="headerButtonText">
                {onBack ? "Back" : "Cancel"}
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