import React, { useState } from "react";
import { X, Info, ChevronDown } from "lucide-react";

export default function PaymentInvoiceModal({
  isOpen = true,
  onClose,
  invoice = {
    id: "G177502127",
    billingPeriod: "Aug 10, 2026 to Aug 10,2026",
    invoiceDate: "Aug 11, 2026",
    billingProfile: "Zevon Systems LLP",
    dueDate: "August 12, 2026",
    amount: "3,091.31",
  },
}) {
  const [selectedMethod, setSelectedMethod] = useState("UPI with QR");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-[440px] bg-[#141416] border border-[#26262b] rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-white animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Pay invoice {invoice.id}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer p-1 -mr-1"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1c1d22] border border-[#27282f] text-xs text-[#a1a1aa] leading-relaxed">
          <Info size={16} className="text-[#a1a1aa] shrink-0 mt-0.5" />
          <p>
            Verify that you're using a payment method that is not expired before you pay your balance.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-[#a1a1aa] leading-relaxed">
          <p>
            Use credit or debit cards to pay the remaining balance partially or pay the whole balance.
          </p>
          <a
            href="#learn-more"
            className="text-[#f59e0b] hover:text-[#d97706] font-medium transition-colors"
          >
            Learn more about paying invoices
          </a>
          <p className="text-[#71717a]">
            This is a summary of details for this invoice. Recent payment or changes to subscriptions will be included on your next invoice.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between text-[#71717a]">
            <span>Billing Period</span>
            <span className="text-[#d4d4d8] font-medium">{invoice.billingPeriod}</span>
          </div>
          <div className="flex items-center justify-between text-[#71717a]">
            <span>Invoice Date</span>
            <span className="text-[#d4d4d8] font-medium">{invoice.invoiceDate}</span>
          </div>
          <div className="flex items-center justify-between text-[#71717a]">
            <span>Billing Profile</span>
            <span className="text-[#d4d4d8] font-medium">{invoice.billingProfile}</span>
          </div>
          <div className="flex items-center justify-between text-[#71717a]">
            <span>Balance past due on {invoice.dueDate}</span>
            <span className="text-white font-medium">₹{invoice.amount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs font-semibold">
          <span className="text-white">Amount to be paid</span>
          <span className="text-white text-sm">₹{invoice.amount}</span>
        </div>

        <div className="relative">
          <div className="w-full h-11 px-4 rounded-full bg-[#1c1d22] border border-[#27282f] flex items-center justify-between cursor-pointer hover:border-[#3f3f46] transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="font-bold tracking-tighter text-xs px-1.5 py-0.5 rounded bg-white text-black leading-none">
                UPI
              </span>
              <span className="text-xs text-white font-medium">{selectedMethod}</span>
            </div>
            <ChevronDown size={15} className="text-[#71717a]" />
          </div>
        </div>

        <button
          type="button"
          className="w-full h-10 rounded-full bg-[#F5B700] hover:bg-[#d9a200] active:scale-[0.99] text-black text-xs font-semibold transition-all cursor-pointer shadow-md"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}