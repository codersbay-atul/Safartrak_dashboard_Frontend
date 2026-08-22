import React, { useEffect, useState } from "react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

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

export default function UserInfo({
  isOpen,
  onClose,
  onNext,
  initialData,
  existingUsers = [],
  checkUserExists,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUserId = initialData?.id || initialData?.user?.id;

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

  const validate = async () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Invalid email format";
    }

    const rawPhone = formData.phoneNumber.replace(/\s+/g, "");
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(rawPhone)) {
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

    if (!newErrors.email || !newErrors.phoneNumber) {
      const isDuplicateEmail = existingUsers.some((u) => {
        const uId = u.id || u.user?.id;
        const uEmail = (u.email || u.user?.email || u.personal?.email || "").toLowerCase();
        return uId !== currentUserId && uEmail === cleanEmail;
      });

      const isDuplicatePhone = existingUsers.some((u) => {
        const uId = u.id || u.user?.id;
        const uPhone = (u.phone || u.user?.phone || u.personal?.phone || "").replace(/\s+/g, "");
        return uId !== currentUserId && uPhone === rawPhone;
      });

      if (isDuplicateEmail) {
        newErrors.email = "Email is already in use";
      }

      if (isDuplicatePhone) {
        newErrors.phoneNumber = "Phone number is already in use";
      }
    }

    if (typeof checkUserExists === "function" && !newErrors.email && !newErrors.phoneNumber) {
      try {
        const { emailExists, phoneExists } = await checkUserExists({
          email: cleanEmail,
          phone: rawPhone,
          userId: currentUserId,
        });

        if (emailExists) newErrors.email = "Email is already in use";
        if (phoneExists) newErrors.phoneNumber = "Phone number is already in use";
      } catch (err) {
        console.error("Error validating user existence:", err);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = await validate();
    setIsSubmitting(false);

    if (isValid && onNext) {
      onNext(formData);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[460px] border border-[#27272a] rounded-2xl p-5 shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="pb-3 mb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Personal Information
          </MainLayoutColor>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="w-full">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block mb-1 font-medium text-[12px]"
            >
              Full Name
            </MainLayoutColor>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-[#18181b]/80 border rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none transition-colors ${
                errors.fullName ? "border-rose-500 focus:border-rose-500" : "border-[#27272a] focus:border-[var(--color-yellow,#ffd60a)]"
              }`}
            />
            {errors.fullName && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.fullName}</span>}
          </div>

          {/* Email & Phone Number */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Email
              </MainLayoutColor>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/80 border rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none transition-colors ${
                  errors.email ? "border-rose-500 focus:border-rose-500" : "border-[#27272a] focus:border-[var(--color-yellow,#ffd60a)]"
                }`}
              />
              {errors.email && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.email}</span>}
            </div>

            <div className="w-full">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Phone Number
              </MainLayoutColor>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/80 border rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none transition-colors ${
                  errors.phoneNumber ? "border-rose-500 focus:border-rose-500" : "border-[#27272a] focus:border-[var(--color-yellow,#ffd60a)]"
                }`}
              />
              {errors.phoneNumber && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.phoneNumber}</span>}
            </div>
          </div>

          {/* Employee ID & Department */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Employee ID
              </MainLayoutColor>
              <input
                type="text"
                name="employeeId"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                className={`w-full bg-[#18181b]/80 border rounded-xl px-3 py-2 text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none transition-colors ${
                  errors.employeeId ? "border-rose-500 focus:border-rose-500" : "border-[#27272a] focus:border-[var(--color-yellow,#ffd60a)]"
                }`}
              />
              {errors.employeeId && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.employeeId}</span>}
            </div>

            <div className="w-full flex flex-col min-w-0">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Department
              </MainLayoutColor>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <MainDropDown
                  label="Select Department"
                  options={departmentOptions}
                  selectedValue={formData.department}
                  onSelect={(val) => handleDropdownSelect("department", val)}
                  className={`rounded-xl bg-[#18181b]/80 py-2 px-3 text-[12px] w-full border ${
                    errors.department ? "border-rose-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.department && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.department}</span>}
            </div>
          </div>

          {/* Role & Assigned Fleet */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="w-full flex flex-col min-w-0">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Role
              </MainLayoutColor>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <MainDropDown
                  label="Select Role"
                  options={roleOptions}
                  selectedValue={formData.role}
                  onSelect={(val) => handleDropdownSelect("role", val)}
                  className={`rounded-xl bg-[#18181b]/80 py-2 px-3 text-[12px] w-full border ${
                    errors.role ? "border-rose-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.role && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.role}</span>}
            </div>

            <div className="w-full flex flex-col min-w-0">
              <MainLayoutColor
                as="label"
                color="subtitle"
                className="block mb-1 font-medium text-[12px]"
              >
                Assigned Fleet
              </MainLayoutColor>
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
                <MainDropDown
                  label="Select Assigned Fleet"
                  options={fleetOptions}
                  selectedValue={formData.assignedFleet}
                  onSelect={(val) => handleDropdownSelect("assignedFleet", val)}
                  className={`rounded-xl bg-[#18181b]/80 py-2 px-3 text-[12px] w-full border ${
                    errors.assignedFleet ? "border-rose-500" : "border-[#27272a]"
                  }`}
                />
              </div>
              {errors.assignedFleet && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.assignedFleet}</span>}
            </div>
          </div>

          {/* Reporting Manager */}
          <div className="w-full flex flex-col">
            <MainLayoutColor
              as="label"
              color="subtitle"
              className="block mb-1 font-medium text-[12px]"
            >
              Reporting Manager
            </MainLayoutColor>
            <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-between">
              <MainDropDown
                label="Select Reporting Manager"
                options={managerOptions}
                selectedValue={formData.reportingManager}
                onSelect={(val) => handleDropdownSelect("reportingManager", val)}
                className={`rounded-xl bg-[#18181b]/80 py-2 px-3 text-[12px] w-full border ${
                  errors.reportingManager ? "border-rose-500" : "border-[#27272a]"
                }`}
              />
            </div>
            {errors.reportingManager && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.reportingManager}</span>}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 mt-2 border-t border-[#27272a]">
            <MainHeaderActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer"
            >
              <span className="text-[14px] font-medium whitespace-nowrap leading-none">
                Cancel
              </span>
            </MainHeaderActionButton>

            <MainHeaderActionButton
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ffd60a] hover:bg-[#e6c200] text-black font-bold border border-[#ffd60a] cursor-pointer disabled:opacity-50"
            >
              <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
                {isSubmitting ? "Validating..." : "Next"}
              </span>
            </MainHeaderActionButton>
          </div>
        </form>
      </MainLayoutColor>
    </div>
  );
}