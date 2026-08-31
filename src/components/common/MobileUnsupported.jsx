import React from "react";
import Logo from "../../assets/images/Logo.svg";

export default function MobileUnsupported() {
  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-[#09090B] overflow-hidden flex items-center justify-center px-6 select-none">
      <div className="flex flex-col items-center text-center gap-5">
        <img
          src={Logo}
          alt="SafarTrak"
          className="h-7 w-auto select-none pointer-events-none"
        />
        <p className="text-[15px] leading-6 text-[#A8A8A8] font-normal max-w-[280px]">
          SafarTrak is available on desktop.
          <br />
          Please switch to desktop for a better
          <br />
          experience.
        </p>
      </div>
    </div>
  );
}
