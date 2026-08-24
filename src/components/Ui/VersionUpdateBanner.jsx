import React from "react";
import { RefreshCw } from "lucide-react";
import MainLayoutColor from "./MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "./MainLayoutUI/MainHeaderActionButton";
import { useVersionCheck } from "../../useVersionCheck";

export default function VersionUpdateBanner() {


  
  const updateAvailable = useVersionCheck();
  // const updateAvailable = true;

  if (!updateAvailable) return null;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="w-full min-w-0 shrink-0 z-50 bg-[#120e03] border-b border-[#3d2c04] px-4 sm:px-5 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 font-sans select-none">
      <div className="flex flex-col gap-0.5 min-w-0 max-w-full">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="tracking-normal font-normal text-[#F5B700] text-[13px] leading-5 block text-center sm:text-left"
        >
          We’ve upgraded SafarTrak with the latest improvements. When you have a
          moment, refresh this page to experience the newest version of
          SafarTrak.
        </MainLayoutColor>
      </div>

      <MainHeaderActionButton
        type="button"
        onClick={handleRefresh}
        icon={RefreshCw}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="shrink-0 px-5 py-2.5 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] active:scale-[0.98] text-black border border-[#F5B700] transition-all cursor-pointer shadow-sm"
      >
        <span className="text-[14px] font-semibold text-black whitespace-nowrap leading-none">
          Refresh
        </span>
      </MainHeaderActionButton>
    </div>
  );
}
