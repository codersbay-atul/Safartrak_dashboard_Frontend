import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Ui/DropDown";

const DEFAULT_FORM = {
  fullName: "",
  email: "",
  phoneNumber: "",
  employeeId: "",
  department: "",
  role: "",
  assignedFleet: "",
  reportingManager: "",
};

function normalizeRole(role) {
  if (!role) return "";
  const value = String(role).toLowerCase();
  if (value.includes("admin")) return "admin";
  if (value.includes("manager") || value.includes("fleet_owner")) return "manager";
  if (value.includes("user") || value.includes("operator")) return "operator";
  return value;
}

function normalizeDepartment(department) {
  if (!department) return "";
  const value = String(department).toLowerCase();
  if (value.includes("operations")) return "operations";
  if (value.includes("logistics")) return "logistics";
  if (value.includes("fleet")) return "fleet";
  return value;
}

export default function UserInfo({ isOpen, onClose, onNext, initialData }) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (!initialData) {
      setFormData(DEFAULT_FORM);
      return;
    }

    const user = initialData.user ?? initialData;
    const personal = user.personal ?? {};

    setFormData({
      fullName: personal.full_name || user.name || "",
      email: personal.email || user.email || "",
      phoneNumber: personal.phone || user.phone || "",
      employeeId: personal.employee_id || "",
      department: normalizeDepartment(personal.department || user.department || ""),
      role: normalizeRole(user.role || ""),
      assignedFleet: user.fleet || "",
      reportingManager: personal.reporting_manager || "",
    });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!formData.department) {
      newErrors.department = "Select a department";
    }

    if (!formData.role) {
      newErrors.role = "Select a role";
    }

    if (!formData.assignedFleet) {
      newErrors.assignedFleet = "Select a fleet";
    }

    if (!formData.reportingManager) {
      newErrors.reportingManager = "Select a reporting manager";
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

  const handleDropdownSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onNext) onNext(formData);
    }
  };

  const departmentOptions = [
    { label: "Operations", value: "operations" },
    { label: "Logistics", value: "logistics" },
    { label: "Fleet Management", value: "fleet" },
  ];

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Fleet Manager", value: "manager" },
    { label: "Operator", value: "operator" },
    { label: "User", value: "user" },
  ];

  const fleetOptions = [
    { label: "North Zone Fleet", value: "fleet1" },
    { label: "South Zone Fleet", value: "fleet2" },
  ];

  const managerOptions = [
    { label: "Alex Turner", value: "mgr1" },
    { label: "Sarah Jenkins", value: "mgr2" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-[440px] bg-[#121215] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col text-white">
        <div className="pb-3 mb-3 border-b border-[#27272a]/60">
          <h2 className="text-[13px] font-bold tracking-wide">
            Personal Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[10.5px]">
          <div className="w-full">
            <label className="block text-[#71717a] mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-[#18181c] border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none ${
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
              }`}
            />
            {errors.fullName && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.fullName}</span>}
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full">
              <label className="block text-[#71717a] mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#18181c] border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.email && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.email}</span>}
            </div>
            <div className="w-full">
              <label className="block text-[#71717a] mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181c] border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none ${
                  errors.phoneNumber ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.phoneNumber && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full">
              <label className="block text-[#71717a] mb-1 font-medium">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                className={`w-full bg-[#18181c] border rounded-xl px-3 py-2 text-white placeholder-[#52525b] focus:outline-none ${
                  errors.employeeId ? "border-red-500 focus:border-red-500" : "border-[#27272a] focus:border-[#ffd60a]"
                }`}
              />
              {errors.employeeId && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.employeeId}</span>}
            </div>
            <div className="w-full flex flex-col min-w-0">
              <label className="block text-[#71717a] mb-1 font-medium">Department</label>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <Dropdown
                  label="Select Department"
                  options={departmentOptions}
                  selectedValue={formData.department}
                  onSelect={(val) => handleDropdownSelect("department", val)}
                  className={`rounded-xl bg-[#18181c] py-2 w-full border ${
                    errors.department ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.department && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.department}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full flex flex-col min-w-0">
              <label className="block text-[#71717a] mb-1 font-medium">Role</label>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <Dropdown
                  label="Select Role"
                  options={roleOptions}
                  selectedValue={formData.role}
                  onSelect={(val) => handleDropdownSelect("role", val)}
                  className={`rounded-xl bg-[#18181c] py-2 w-full border ${
                    errors.role ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.role && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.role}</span>}
            </div>
            <div className="w-full flex flex-col min-w-0">
              <label className="block text-[#71717a] mb-1 font-medium">Assigned Fleet</label>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <Dropdown
                  label="Select Assigned Fleet"
                  options={fleetOptions}
                  selectedValue={formData.assignedFleet}
                  onSelect={(val) => handleDropdownSelect("assignedFleet", val)}
                  className={`rounded-xl bg-[#18181c] py-2 w-full border ${
                    errors.assignedFleet ? "border-red-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.assignedFleet && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.assignedFleet}</span>}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label className="block text-[#71717a] mb-1 font-medium">Reporting Manager</label>
            <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
              <Dropdown
                label="Select Reporting Manager"
                options={managerOptions}
                selectedValue={formData.reportingManager}
                onSelect={(val) => handleDropdownSelect("reportingManager", val)}
                className={`rounded-xl bg-[#18181c] py-2 w-full border ${
                  errors.reportingManager ? "border-red-500" : "border-[#27272a]"
                }`}
              />
            </div>
            {errors.reportingManager && <span className="text-red-500 text-[9px] mt-0.5 block">{errors.reportingManager}</span>}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#27272a]/60">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-[11px] font-semibold bg-[#27272a]/70 hover:bg-[#27272a] text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-[11px] font-bold text-black bg-[#ffd60a] hover:bg-[#e6c200] transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}