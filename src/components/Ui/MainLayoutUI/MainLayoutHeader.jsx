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
        color="text"
        size="title"
        className="block truncate text-[16px] leading-[24px] font-bold"
      >
        {title}
      </MainLayoutColor>

      {subtitle && (
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="grey"
          size="subtitle"
          className="mt-1 block truncate max-w-full xl:max-w-xl 2xl:max-w-2xl text-[12px] leading-[16px]"
        >
          {subtitle}
        </MainLayoutColor>
      )}

      {children}
    </div>
  );
}