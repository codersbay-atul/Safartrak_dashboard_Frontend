const SIDEBAR_COLORS = {
  text: "text-[rgb(255,255,255)]",
  background: "bg-[#141414]",
  icon: "text-[#FCBA12]",
};

export default function SideColor({
  as: Component = "span",
  color,
  bg,
  className = "",
  children,
  ...props
}) {
  const textColorClass = color ? SIDEBAR_COLORS[color] || "" : "";
  const backgroundColorClass = bg ? SIDEBAR_COLORS[bg] || "" : "";

  return (
    <Component
      className={`${textColorClass} ${backgroundColorClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}