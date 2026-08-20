const SIDEBAR_TEXT_SIZES = {
  item: "text-[14px] leading-[18px] font-normal not-italic",
};

export default function SideTextSize({
  as: Component = "span",
  size = "item",
  className = "",
  children,
  ...props
}) {
  const selectedSize = SIDEBAR_TEXT_SIZES[size] || SIDEBAR_TEXT_SIZES.item;

  return (
    <Component className={`side-text ${selectedSize} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}