import MainLayoutButton from "./MainLayoutUI/MainLayoutButton";

export default function HeaderActionButton({ children, variant = "primary", icon: Icon, iconPosition = "left", className = "", ...props }) {
  const compactClassName = ["h-8 px-3 rounded-lg text-[10px] sm:text-[10.5px] font-semibold", variant === "primary" ? "bg-[#FDBB24] text-black hover:bg-[#e0a31f]" : "bg-[#18181b]/70 border border-[#27272a] text-[#d4d4d8] hover:bg-[#27272a] hover:text-white", className].filter(Boolean).join(" ");
  return <MainLayoutButton variant={variant} size="sm" icon={Icon} iconPosition={iconPosition} className={compactClassName} {...props}>{children}</MainLayoutButton>;
}
