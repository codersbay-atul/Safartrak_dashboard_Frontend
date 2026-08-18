import React from "react";
import { User } from "lucide-react";
import earthIcon from "../../assets/images/earth.png";



export default function AccountDetailsSection() {
  const accountFields = [
    { label: "ACCOUNT ID", value: "jdindia2", isRegion: false },
    { label: "ACCOUNT REGION", value: "Asia (India)", isRegion: true },
    { label: "API BASE URL", value: "api.safartrak.com", isRegion: false },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <User size={18} className="text-[#ffd60a]" />
        <h3 className="text-sm font-semibold text-white">Account Details</h3>
      </div>

      <div className="w-full bg-[#0d0e12] border border-[#20242d] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accountFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#71717A] tracking-wider uppercase">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                {item.isRegion && (
                  <img 
                    src={earthIcon}
                    alt="earth" 
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                )}
                <span className="text-white font-medium text-sm">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}