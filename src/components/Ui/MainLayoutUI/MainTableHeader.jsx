import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainTableHeader({
  children,
  background, // optional override
  color = "title",
  size = "tableHeader",
  align = "left",
  className = "",
  ...props
}) {
  const alignmentClass =
    align === "right"
      ? "text-right"
      : align === "center"
      ? "text-center"
      : "text-left";

  return (
    <MainLayoutColor
      as="th"
      background={background}
      className={`py-2.5 px-3 whitespace-nowrap ${alignmentClass} ${className}`.trim()}
      {...props}
    >
      <MainLayoutColor
        as={MainLayoutTextSize}
        color={color}
        size={size}
        className="block"
      >
        {children}
      </MainLayoutColor>
    </MainLayoutColor>
  );
}