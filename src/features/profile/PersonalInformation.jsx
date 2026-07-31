import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PersonalInformation({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    subCategory: "",
    relatedVehicle: "None",
    priority: "High",
    description: "",
    file: null,
  });

  const [fileName, setFileName] = useState("Attach a screenshot or file");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full max-w-xl">
      {/* Header */}
      <h2 className="text-base font-semibold text-white mb-6 pb-4 border-b border-[#1f1f23]">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Short summary of the issue"
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b]"
          />
        </div>

        {/* Category & Sub Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#71717a] font-medium">Category</label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full appearance-none bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-[#a1a1aa] focus:outline-none focus:border-[#52525b] cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                <option value="hardware">Hardware Issue</option>
                <option value="software">Software Bug</option>
                <option value="billing">Billing & Account</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#71717a] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#71717a] font-medium">Sub Category</label>
            <div className="relative">
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full appearance-none bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-[#a1a1aa] focus:outline-none focus:border-[#52525b] cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select a Sub category
                </option>
                <option value="gps">GPS Disconnected</option>
                <option value="export">Data Export Issue</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#71717a] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Related Vehicle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">
            Related Vehicle (optional)
          </label>
          <input
            type="text"
            name="relatedVehicle"
            value={formData.relatedVehicle}
            onChange={handleChange}
            placeholder="None"
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b]"
          />
        </div>

        {/* Priority Radio Group */}
        <div className="flex flex-col gap-2 my-1">
          <label className="text-xs text-[#71717a] font-medium">Priority</label>
          <div className="flex items-center gap-6">
            {["Low", "Medium", "High"].map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 text-xs text-white cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={formData.priority === level}
                  onChange={handleChange}
                  className="accent-[#FFC107] w-3.5 h-3.5 cursor-pointer"
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#71717a] font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="What happened, when, and anything you're already tried"
            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-3.5 text-xs text-white placeholder-[#3f3f46] focus:outline-none focus:border-[#52525b] resize-none"
          />
        </div>

        {/* File Attachment Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white font-medium">Vehicle Image</label>
          <label className="flex items-center gap-3 bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-[#3f3f46] transition-colors">
            <span className="bg-[#27272a] text-white text-xs font-medium px-3 py-1 rounded-lg shrink-0">
              Choose file
            </span>
            <span className="text-xs text-[#71717a] truncate">{fileName}</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-[#FFC107] hover:bg-[#e6ac00] text-black text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}