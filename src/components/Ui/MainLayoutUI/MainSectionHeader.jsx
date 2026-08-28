import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainSectionHeader({
  icon: Icon,
  title,
  className = "",
  children,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 px-1 shrink-0 mt-4 ${className}`.trim()}
    >
      <div className="flex items-center gap-2">
        {Icon ? (
          <MainLayoutColor
            as={Icon}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
        ) : null}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block"
        >
          {title}
        </MainLayoutColor>
      </div>
      {children}
    </div>
  );
}
