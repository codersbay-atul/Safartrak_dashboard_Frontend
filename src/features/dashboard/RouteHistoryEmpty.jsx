import React from "react";
import { Route } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function RouteHistoryEmpty() {
  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-3 select-none overflow-hidden min-w-0 px-6 text-center"
    >
      <div className="w-11 h-11 rounded-full bg-[#FDB914]/10 border border-[#FDB914]/40 flex items-center justify-center">
        <Route size={18} className="text-[#FDB914]" />
      </div>
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="font-semibold"
      >
        Route History
      </MainLayoutColor>
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="max-w-[220px] leading-snug"
      >
        Select a vehicle to load live route history from today&apos;s activity.
      </MainLayoutColor>
    </MainLayoutColor>
  );
}
