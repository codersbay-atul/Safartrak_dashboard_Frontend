const NAV_TEXT_SIZES = {
  moduleName: "text-[18px] leading-[27px] font-semibold not-italic",
  dayText: "text-[14px] leading-[14px] font-semibold not-italic",
  monthText: "text-[12px] leading-normal font-normal not-italic",
  profileText: "text-[16px] leading-[24px] font-normal not-italic",
  iconText: "text-[16px] leading-[24px] font-normal not-italic",
};

export default function NavTextSize({
  as: Component = "span",
  size = "moduleName",
  className = "",
  children,
  ...props
}) {
  const selectedSize = NAV_TEXT_SIZES[size] || NAV_TEXT_SIZES.moduleName;

  return (
    <Component
      className={`nav-text ${selectedSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}