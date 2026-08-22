import React, { useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const FLEET_GROUP_OPTIONS = [
  { label: "North Region Fleet", value: "group1" },
  { label: "South Logistics", value: "group2" },
  { label: "Express Delivery", value: "group3" },
];

const OPERATING_REGION_OPTIONS = [
  { label: "North Zone", value: "north" },
  { label: "West Zone", value: "west" },
  { label: "East Zone", value: "east" },
];

const DEPOT_WAREHOUSE_OPTIONS = [
  { label: "Central Warehouse 01", value: "depot1" },
  { label: "South Depot A", value: "depot2" },
];

export default function AddFleetAssignmentModal({ isOpen, onClose, onNext, onBack }) {
  const [formData, setFormData] = useState({
    fleetGroup: "",
    operatingRegion: "",
    depotWarehouse: "",
    businessUnit: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fleetGroup) {
      newErrors.fleetGroup = "Please select a Fleet Group";
    }

    if (!formData.operatingRegion) {
      newErrors.operatingRegion = "Please select an Operating Region";
    }

    if (!formData.depotWarehouse) {
      newErrors.depotWarehouse = "Please select a Depot/Warehouse";
    }

    if (!formData.businessUnit.trim()) {
      newErrors.businessUnit = "Business Unit is required";
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
        {/* 14px Modal Header */}
        <div className="pb-2.5 mb-2 border-b border-[#1d1d20]/60 shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block"
          >
            Add Fleet Assignment
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
                Fleet Group
              </MainLayoutColor>
              <MainDropDown
                label="Select Fleet Group"
                options={FLEET_GROUP_OPTIONS}
                selectedValue={formData.fleetGroup}
                onSelect={(val) => handleDropdownSelect("fleetGroup", val)}
                className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                  errors.fleetGroup ? "border-red-500" : "border-[#27272a]"
                }`}
              />
              {errors.fleetGroup && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.fleetGroup}</p>
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
                  Operating Region
                </MainLayoutColor>
                <MainDropDown
                  label="Select Operating Region"
                  options={OPERATING_REGION_OPTIONS}
                  selectedValue={formData.operatingRegion}
                  onSelect={(val) => handleDropdownSelect("operatingRegion", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.operatingRegion ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.operatingRegion && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.operatingRegion}</p>
                )}
              </div>

              <div>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="block mb-1 font-medium"
                >
                  Depot / Warehouse
                </MainLayoutColor>
                <MainDropDown
                  label="Select Depot / Warehouse"
                  options={DEPOT_WAREHOUSE_OPTIONS}
                  selectedValue={formData.depotWarehouse}
                  onSelect={(val) => handleDropdownSelect("depotWarehouse", val)}
                  className={`w-full justify-between rounded-lg bg-[#18181b]/60 border py-1.5 px-2.5 text-white ${
                    errors.depotWarehouse ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
                {errors.depotWarehouse && (
                  <p className="text-red-500 text-[10px] mt-0.5">{errors.depotWarehouse}</p>
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
                Business Unit
              </MainLayoutColor>
              <input
                type="text"
                name="businessUnit"
                placeholder="Enter Business Unit"
                value={formData.businessUnit}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/60 border rounded-lg px-2.5 py-1.5 text-[12px] text-white placeholder-[#52525b] focus:outline-none transition-all ${
                  errors.businessUnit
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.businessUnit && (
                <p className="text-red-500 text-[10px] mt-0.5">{errors.businessUnit}</p>
              )}
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