import React from "react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function AlertTypeGrid({
  types = [],
  activeType = "all",
  onTypeSelect,
  isLoading = false,
  isError = false,
}) {
  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full min-w-0 border rounded-xl p-2.5 sm:p-3 select-none shrink-0"
    >
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="tracking-tight mb-2.5 block font-semibold"
      >
        Alert Types
      </MainLayoutColor>

      {isLoading && types.length === 0 ? (
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-center py-6 block"
        >
          Loading...
        </MainLayoutColor>
      ) : isError && types.length === 0 ? (
        <MainLayoutTextSize
          size="subInfoText"
          className="text-[#ef4444] text-center py-6 block"
        >
          Failed to load alert types
        </MainLayoutTextSize>
      ) : types.length === 0 ? (
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-center py-6 block"
        >
          No alert types available
        </MainLayoutColor>
      ) : (
        <div className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2">
          {types.map((type) => {
            const Icon = type.icon;
            const isActive = activeType === type.id;

            return (
              <MainLayoutColor
                key={type.id}
                as="button"
                background="surface"
                border="cardBorder"
                borderHover="cardBorderHover"
                type="button"
                onClick={() =>
                  onTypeSelect?.(isActive ? "all" : type.id)
                }
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2.5 sm:gap-1.5 sm:px-2 sm:py-3 min-h-[68px] sm:min-h-[72px] transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FDBB24]/10 text-white"
                    : "text-[#d4d4d8]"
                }`}
              >
                {type.count ? (
                  <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#ef4444] text-white text-[8px] font-bold flex items-center justify-center shadow">
                    {type.count}
                  </span>
                ) : null}

                {Icon && (
                  <Icon
                    size={16}
                    className={isActive ? "text-[#FDBB24]" : "text-[#a1a1aa]"}
                  />
                )}
                <MainLayoutTextSize
                  size="subInfoText"
                  className="font-medium text-center leading-tight line-clamp-2"
                >
                  {type.label}
                </MainLayoutTextSize>
              </MainLayoutColor>
            );
          })}
        </div>
      )}
    </MainLayoutColor>
  );
}