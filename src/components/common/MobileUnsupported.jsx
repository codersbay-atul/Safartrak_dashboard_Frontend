import React from "react";
import Logo from "../../assets/images/Logo.svg";
export default function MobileUnsupported() {
  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-[#09090B] text-white overflow-hidden flex items-center justify-center px-6 select-none">
      <div className="w-full max-w-lg flex flex-col items-center text-center gap-6">
      <img
  src={Logo}
  alt="SafarTrak"
  className="h-8 w-auto select-none pointer-events-none"
/>

        <div className="flex flex-col items-center gap-3">
          <h2 className="text-[32px] font-bold text-white leading-tight">
            Oops!
          </h2>

          <p className="text-[20px] font-medium text-white leading-snug">
            SafarTrak works best on a bigger screen.
          </p>

          <p className="text-[16px] text-[#A1A1AA] leading-relaxed max-w-md">
            This dashboard is designed for desktop and laptop devices to provide
            the best tracking experience.
            <br />
            <br />
            Please switch to a desktop or laptop to continue.
          </p>
        </div>

        {/* <div className="w-full rounded-2xl bg-[#17171C] border border-[#2A2A2F] px-6 py-5 text-left">
          <p className="text-[16px] font-semibold text-white mb-3">
            🖥️ Desktop Recommended
          </p>
          <ul className="flex flex-col gap-2 text-[15px] text-[#D4D4D8]">
            <li>• Full Fleet Dashboard</li>
            <li>• Live Vehicle Tracking</li>
            <li>• Analytics & Reports</li>
            <li>• Better Navigation Experience</li>
          </ul>
        </div> */}

        <p className="text-[14px] text-[#71717A]">
          We&apos;ll be waiting for you on desktop 🚚
        </p>
      </div>
    </div>
  );
}
