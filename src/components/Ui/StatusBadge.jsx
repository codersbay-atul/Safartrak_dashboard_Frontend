import React from "react";

export default function StatusBadge({ 
  label, 
  variant = "active", // active, moving, idle, critical, offline
  pulse = false 
}) {
  const variants = {
    active: "bg-[#052e16] border-[#14532d] text-[#22c55e]",
    moving: "bg-[#052e16] border-[#14532d] text-[#22c55e]",
    idle: "bg-[#7c2d12]/20 border-[#7c2d12]/50 text-[#ea580c]",
    critical: "bg-[#450a0a] border-[#7f1d1d] text-[#f87171]",
    offline: "bg-zinc-900 border-zinc-800 text-zinc-500"
  };

  const dotColors = {
    active: "bg-[#22c55e]",
    moving: "bg-[#22c55e]",
    idle: "bg-[#ea580c]",
    critical: "bg-[#ef4444]",
    offline: "bg-zinc-600"
  };

  return (
    <span className={`inline-flex items-center gap-1 border text-[9px] font-bold px-2 py-0.5 rounded-full ${variants[variant]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${pulse ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}