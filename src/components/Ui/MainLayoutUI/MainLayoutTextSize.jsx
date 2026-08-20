const MAIN_LAYOUT_TEXT_SIZES = {
  title: "text-[16px]",
  subtitle: "text-[12px]",
};

export default function MainLayoutTextSize({
  as: Component = "span",
  size = "title",
  className = "",
  children,
  ...props
}) {
  const fontBase = "font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] font-semibold leading-[20px] not-italic";
  const selectedSize = MAIN_LAYOUT_TEXT_SIZES[size] || MAIN_LAYOUT_TEXT_SIZES.title;

  return (
    <Component
      className={`${fontBase} ${selectedSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}