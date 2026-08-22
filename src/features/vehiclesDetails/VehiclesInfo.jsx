import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "../../components/Ui/toast";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function VehiclesInfo({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    rcFile: null,
    insuranceFile: null,
    fitnessFile: null,
    pollutionFile: null,
    permitFile: null,
    vehicleImage: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rcFile) {
      newErrors.rcFile = "Registration certificate is required";
    }
    if (!formData.insuranceFile) {
      newErrors.insuranceFile = "Insurance document is required";
    }
    if (!formData.fitnessFile) {
      newErrors.fitnessFile = "Fitness certificate is required";
    }
    if (!formData.pollutionFile) {
      newErrors.pollutionFile = "Pollution certificate is required";
    }
    if (!formData.permitFile) {
      newErrors.permitFile = "Permit document is required";
    }
    if (!formData.vehicleImage) {
      newErrors.vehicleImage = "Vehicle image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please upload all required documents");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.success("Documents uploaded successfully");
      if (onNext) onNext(formData);
    } catch (error) {
      console.error("Failed to upload vehicle documents", error);
      toast.error(error?.message || "Failed to upload documents");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFields = [
    { name: "rcFile", label: "Registration Certificate (RC)", placeholder: "Upload RC Certificate" },
    { name: "insuranceFile", label: "Insurance", placeholder: "Upload Insurance Document" },
    { name: "fitnessFile", label: "Fitness Certificate", placeholder: "Upload Fitness Certificate" },
    { name: "pollutionFile", label: "Pollution Certificate", placeholder: "Upload Pollution Certificate" },
    { name: "permitFile", label: "Permit", placeholder: "Upload Permit Document" },
    { name: "vehicleImage", label: "Vehicle Image", placeholder: "Upload Vehicle Image" },
  ];

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
          Vehicle Settings (Document Uploads)
        </MainLayoutColor>
      </div>

      {/* Form Body */}
      <form onSubmit={handleNext} className="flex flex-col gap-3">
        {/* Row 1: RC & Insurance */}
        <div className="grid grid-cols-2 gap-2.5">
          {uploadFields.slice(0, 2).map((field) => (
            <div key={field.name}>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                {field.label} <span className="text-rose-500">*</span>
              </MainLayoutColor>
              <div
                className={`flex items-center bg-[#18181b]/60 border ${
                  errors[field.name] ? "border-rose-500" : "border-[#27272a]"
                } rounded-xl overflow-hidden focus-within:border-[var(--color-yellow,#ffd60a)] transition-all`}
              >
                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0 text-[11px]">
                  <Upload size={13} className="text-[#ffd60a]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="px-2.5 py-1.5 text-[#52525b] text-[11px] truncate flex-1 font-medium">
                  {formData[field.name] ? (
                    <span className="text-white">{formData[field.name].name}</span>
                  ) : (
                    field.placeholder
                  )}
                </span>
              </div>
              {errors[field.name] && (
                <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Fitness & Pollution */}
        <div className="grid grid-cols-2 gap-2.5">
          {uploadFields.slice(2, 4).map((field) => (
            <div key={field.name}>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="block mb-1 font-medium"
              >
                {field.label} <span className="text-rose-500">*</span>
              </MainLayoutColor>
              <div
                className={`flex items-center bg-[#18181b]/60 border ${
                  errors[field.name] ? "border-rose-500" : "border-[#27272a]"
                } rounded-xl overflow-hidden focus-within:border-[var(--color-yellow,#ffd60a)] transition-all`}
              >
                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0 text-[11px]">
                  <Upload size={13} className="text-[#ffd60a]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="px-2.5 py-1.5 text-[#52525b] text-[11px] truncate flex-1 font-medium">
                  {formData[field.name] ? (
                    <span className="text-white">{formData[field.name].name}</span>
                  ) : (
                    field.placeholder
                  )}
                </span>
              </div>
              {errors[field.name] && (
                <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Row 3: Permit */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Permit <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <div
            className={`flex items-center bg-[#18181b]/60 border ${
              errors.permitFile ? "border-rose-500" : "border-[#27272a]"
            } rounded-xl overflow-hidden focus-within:border-[var(--color-yellow,#ffd60a)] transition-all`}
          >
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0 text-[11px]">
              <Upload size={13} className="text-[#ffd60a]" />
              <span>Upload</span>
              <input
                type="file"
                name="permitFile"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="px-3 py-1.5 text-[#52525b] text-[11px] truncate flex-1 font-medium">
              {formData.permitFile ? (
                <span className="text-white">{formData.permitFile.name}</span>
              ) : (
                "Upload Permit Document"
              )}
            </span>
          </div>
          {errors.permitFile && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.permitFile}
            </p>
          )}
        </div>

        {/* Row 4: Vehicle Image */}
        <div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block mb-1 font-medium"
          >
            Vehicle Image <span className="text-rose-500">*</span>
          </MainLayoutColor>
          <div
            className={`flex items-center bg-[#18181b]/60 border ${
              errors.vehicleImage ? "border-rose-500" : "border-[#27272a]"
            } rounded-xl overflow-hidden focus-within:border-[var(--color-yellow,#ffd60a)] transition-all`}
          >
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a]/60 text-white font-medium cursor-pointer hover:bg-[#27272a] transition-colors border-r border-[#27272a] shrink-0 text-[11px]">
              <Upload size={13} className="text-[#ffd60a]" />
              <span>Upload</span>
              <input
                type="file"
                name="vehicleImage"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="px-3 py-1.5 text-[#52525b] text-[11px] truncate flex-1 font-medium">
              {formData.vehicleImage ? (
                <span className="text-white">{formData.vehicleImage.name}</span>
              ) : (
                "Upload Vehicle Image"
              )}
            </span>
          </div>
          {errors.vehicleImage && (
            <p className="text-rose-500 text-[10px] mt-0.5 leading-tight">
              {errors.vehicleImage}
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
              {isSubmitting ? "Uploading..." : "Next"}
            </span>
          </MainHeaderActionButton>
        </div>
      </form>
    </MainLayoutColor>
  );
}