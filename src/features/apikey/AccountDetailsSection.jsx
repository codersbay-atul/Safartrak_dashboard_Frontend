import React from "react";
import { User } from "lucide-react";
import earthIcon from "../../assets/images/earth.png";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function AccountDetailsSection() {
  const accountFields = [
    { label: "ACCOUNT ID", value: "jdindia2", isRegion: false },
    { label: "ACCOUNT REGION", value: "Asia (India)", isRegion: true },
    { label: "API BASE URL", value: "api.safartrak.com", isRegion: false },
  ];

  return (
    <div className="flex flex-col gap-2.5 font-sans select-none">
      {/* Section Header (14px sectionTitle) */}
      <div className="flex items-center gap-2">
        <User size={18} className="text-[var(--color-yellow,#ffd60a)]" />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block text-[14px]"
        >
          Account Details
        </MainLayoutColor>
      </div>

      {/* Surface Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full border border-[#27272a] rounded-2xl p-6 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accountFields.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Field Label (12px subInfoText) */}
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-semibold tracking-wider uppercase block text-[12px]"
              >
                {item.label}
              </MainLayoutColor>

              {/* Field Value (14px sectionTitle) */}
              <div className="flex items-center gap-2">
                {item.isRegion && (
                  <img
                    src={earthIcon}
                    alt="earth"
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                )}
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="title"
                  size="sectionTitle"
                  className="font-medium text-[14px]"
                >
                  {item.value}
                </MainLayoutColor>
              </div>
            </div>
          ))}
        </div>
      </MainLayoutColor>
    </div>
  );
}