import React from "react";

export default function PaymentDueBanner({
  daysLeft = 2,
  amount = "2,950",
  dueDate = "Aug 20, 2026",
  onPayNow,
}) {
  return (
    <div className="w-full bg-[#120e03] border border-[#3d2c04] rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="text-[14px] font-medium text-white tracking-normal">
          Payment due in {daysLeft} days
        </h4>
        <p className="text-[13px] text-[#F5B700] tracking-normal font-normal">
          Your current invoice of ₹{amount} is due on {dueDate}.
        </p>
      </div>

      <button
        type="button"
        onClick={onPayNow}
        className="shrink-0 px-5 py-2 rounded-lg bg-[#F5B700] hover:bg-[#d9a200] active:scale-[0.98] text-black text-[14px] font-semibold transition-all cursor-pointer shadow-sm"
      >
        Pay Now
      </button>
    </div>
  );
}