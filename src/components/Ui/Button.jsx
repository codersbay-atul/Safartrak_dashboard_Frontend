import React from "react";

export default function Button({
  children,
  variant = "primary", // 'primary' (yellow), 'secondary' (dark), 'ghost'
  className = "",
  isLoading = false,
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-1.5 px-3 py-1 text-[10.5px] font-bold rounded-md transition-all duration-200 shadow-sm whitespace-nowrap active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[#FDBB24] text-black hover:bg-[#E9AE17]",
    secondary: "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-zinc-600",
    ghost: "bg-transparent text-[#71717a] hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : (
        Icon && iconPosition === "left" && <Icon size={12} className="shrink-0" />
      )}
      
      {children}

      {!isLoading && Icon && iconPosition === "right" && (
        <Icon size={12} className="shrink-0" />
      )}
    </button>
  );
}