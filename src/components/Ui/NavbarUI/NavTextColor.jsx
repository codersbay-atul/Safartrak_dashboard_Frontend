const COLOR_MAP = {
  navbarText: "text-[rgb(255,255,255)]",
  monthText: "text-[rgb(161,161,170)]",

  navbarBg: "bg-[#09090B]",
};

export default function NavTextColor({
  as: Component = "span",
  color = "navbarText",
  bg,
  className = "",
  children,
  ...props
}) {
  const textColorClass = color ? (COLOR_MAP[color] || "") : "";
  const bgColorClass = bg ? (COLOR_MAP[bg] || "") : "";

  return (
    <Component
      className={`${textColorClass} ${bgColorClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}