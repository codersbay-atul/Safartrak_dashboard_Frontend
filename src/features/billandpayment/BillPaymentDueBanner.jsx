import React from "react";

export default function BillPaymentDueBanner({
  invoiceId = "G198429734",
  onPayNow,
}) {
  return (
    <div className="w-full bg-[#120e03] border border-[#3d2c04] rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-[13px] text-[#F5B700] tracking-normal font-normal">
          The balance on Invoice {invoiceId} is past due.
        </p>
      </div>

        <button
        type="button"
        onClick={onPayNow}
        className="shrink-0 px-5 py-2 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] active:scale-[0.98] text-black text-[13px] font-semibold transition-all cursor-pointer shadow-sm"
      >
        Pay Now
      </button>
    </div>
  );
}