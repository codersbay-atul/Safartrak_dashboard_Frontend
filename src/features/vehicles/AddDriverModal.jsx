import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const DRIVER_OPTIONS = [
  { label: "John Doe", value: "driver1" },
  { label: "Alex Smith", value: "driver2" },
  { label: "Rajesh Kumar", value: "driver3" },
];

export default function AddDriverModal({ isOpen, onClose, onNext, onBack }) {
  const [formData, setFormData] = useState({
    assignDriver: "",
    driverPhone: "",
    driverLicenseNumber: "",
    licenseExpiry: "",
    emergencyContact: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.assignDriver) {
      newErrors.assignDriver = "Please select a driver";
    }

    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver phone is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.driverPhone.replace(/\s+/g, ""))) {
      newErrors.driverPhone = "Invalid phone number";
    }

    if (!formData.driverLicenseNumber.trim()) {
      newErrors.driverLicenseNumber = "License number is required";
    }

    if (!formData.licenseExpiry.trim()) {
      newErrors.licenseExpiry = "License expiry date is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.emergencyContact.replace(/\s+/g, ""))) {
      newErrors.emergencyContact = "Invalid phone number";
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

  const handleDriverSelect = (value) => {
    setFormData((prev) => ({ ...prev, assignDriver: value }));

    if (errors.assignDriver) {
      setErrors((prev) => ({ ...prev, assignDriver: "" }));
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
            Add Driver
          </MainLayoutColor>
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
                Assign Driver
              </MainLayoutColor>
              <MainDropDown
                label="Select Assign Driver"
                options={DRIVER_OPTIONS}
                selectedValue={formData.assignDriver}
                onSelect={handleDriverSelect}
                className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                  errors.assignDriver ? "border-red-500" : "border-[#27272a]"
                }`}
              />
              {errors.assignDriver && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.assignDriver}</p>
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
                  Driver Phone
                </MainLayoutColor>
                <input
                  type="text"
                  name="driverPhone"
                  placeholder="Enter Driver Phone"
                  value={formData.driverPhone}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.driverPhone
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#FDBB24]"
                  }`}
                />
                {errors.driverPhone && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.driverPhone}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Driver License Number
                </MainLayoutColor>
                <input
                  type="text"
                  name="driverLicenseNumber"
                  placeholder="Enter Driver License Number"
                  value={formData.driverLicenseNumber}
                  onChange={handleChange}
                  className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                    errors.driverLicenseNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272a] focus:border-[#FDBB24]"
                  }`}
                />
                {errors.driverLicenseNumber && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.driverLicenseNumber}</p>
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
                License Expiry
              </MainLayoutColor>
              <input
                type="date"
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.licenseExpiry
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#FDBB24]"
                }`}
              />
              {errors.licenseExpiry && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.licenseExpiry}</p>
              )}
            </div>

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                Emergency Contact
              </MainLayoutColor>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Enter Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.emergencyContact
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#FDBB24]"
                }`}
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.emergencyContact}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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