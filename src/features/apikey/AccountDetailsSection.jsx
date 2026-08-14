import React from "react";
import { Info } from "lucide-react";

export default function AccountDetailsSection() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <Info size={18} className="text-[#F5B700]" />
        <h3 className="text-sm font-semibold text-white">Account Details</h3>
      </div>

      <div className="w-full bg-[#0d0e12] border border-[#20242d] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "ACCOUNT ID", value: "jdindia2" },
            { label: "ACCOUNT REGION", value: "Asia (India)" },
            { label: "API BASE URL", value: "api.safartrak.com" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#71717A] tracking-wider uppercase">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">
                  {item.value}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.value);
                  }}
                  className="text-gray-500 hover:text-gray-300 transition-colors p-1 focus:outline-none"
                  title="Copy to clipboard"
                  aria-label={`Copy ${item.label}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="12"
                      height="12"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
