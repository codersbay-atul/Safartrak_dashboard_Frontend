import React from "react";
import { Plus } from "lucide-react";

export default function CreateApiKeyButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-[#F5B700] hover:bg-[#E5A700] text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ${className}`}
      aria-label="Create API Key"
    >
      <Plus size={18} strokeWidth={2.5} />
      <span className="text-sm font-medium">Request New Key</span>
    </button>
  );
}
