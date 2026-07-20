import React from "react";

export default function CardWrapper({ children, className = "" }) {
  return (
    <div className={`bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 shadow-xl select-none transition-all duration-200 hover:border-zinc-800/80 ${className}`}>
      {children}
    </div>
  );
}