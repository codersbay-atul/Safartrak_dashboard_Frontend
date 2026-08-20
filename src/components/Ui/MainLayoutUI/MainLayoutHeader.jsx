import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainLayoutHeader({
  title,
  subtitle,
  className = "",
  children,
}) {
  return (
    <div className={`min-w-0 flex-1 select-none ${className}`.trim()}>
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="white"
        size="title"
        className="block truncate font-medium"
      >
        {title}
      </MainLayoutColor>

      {subtitle && (
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subtitle"
          className="mt-1 block truncate max-w-full xl:max-w-xl 2xl:max-w-2xl font-normal"
        >
          {subtitle}
        </MainLayoutColor>
      )}

      {children}
    </div>
  );
}