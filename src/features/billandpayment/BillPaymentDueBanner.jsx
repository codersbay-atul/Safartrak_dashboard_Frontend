import React from "react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function BillPaymentDueBanner({
  invoiceId = "G198429734",
  onPayNow,
}) {
  return (
    <div className="w-full bg-[#120e03] border border-[#3d2c04] rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans select-none">
      <div className="flex flex-col gap-1 min-w-0">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="tracking-normal font-normal text-[#F5B700] text-[13px] block"
        >
          The balance on Invoice {invoiceId} is past due.
        </MainLayoutColor>
      </div>

      <MainHeaderActionButton
        type="button"
        onClick={onPayNow}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="shrink-0 px-5 py-2.5 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] active:scale-[0.98] text-black border border-[#F5B700] transition-all cursor-pointer shadow-sm"
      >
        <span className="text-[14px] font-semibold text-black whitespace-nowrap leading-none">
          Pay Now
        </span>
      </MainHeaderActionButton>
    </div>
  );
}