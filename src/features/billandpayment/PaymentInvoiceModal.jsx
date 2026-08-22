import React, { useState } from "react";
import { X, Info, ChevronDown } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function PaymentInvoiceModal({
  isOpen = true,
  onClose,
  invoice = {
    id: "G177502127",
    billingPeriod: "Aug 10, 2026 to Aug 10, 2026",
    invoiceDate: "Aug 11, 2026",
    billingProfile: "Zevon Systems LLP",
    dueDate: "August 12, 2026",
    amount: "3,091.31",
  },
}) {
  const [selectedMethod, setSelectedMethod] = useState("UPI with QR");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-sans animate-in fade-in zoom-in-95 duration-200">
      <MainLayoutColor
        as="div"
        background="surface"
        className="relative w-full max-w-[460px] border border-[#27272a] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Pay invoice {invoice.id}
          </MainLayoutColor>
          <button
            type="button"
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer p-1 -mr-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#18181b]/80 border border-[#27272a]">
          <Info size={16} className="text-[#a1a1aa] shrink-0 mt-0.5" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed block text-[12px]"
          >
            Verify that you're using a payment method that is not expired before you pay your balance.
          </MainLayoutColor>
        </div>

        {/* Description & Links */}
        <div className="flex flex-col gap-2">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed block text-[12px]"
          >
            Use credit or debit cards to pay the remaining balance partially or pay the whole balance.
          </MainLayoutColor>
          <a
            href="#learn-more"
            className="text-[var(--color-yellow,#ffd60a)] hover:text-[#e6c200] font-medium text-[12px] transition-colors"
          >
            Learn more about paying invoices
          </a>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-relaxed block text-[11px] text-[#71717a]"
          >
            This is a summary of details for this invoice. Recent payment or changes to subscriptions will be included on your next invoice.
          </MainLayoutColor>
        </div>

        {/* Invoice Summary Details */}
        <div className="flex flex-col gap-2 py-2 border-y border-[#27272a]">
          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
              Billing Period
            </MainLayoutColor>
            <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium text-[12px]">
              {invoice.billingPeriod}
            </MainLayoutColor>
          </div>

          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
              Invoice Date
            </MainLayoutColor>
            <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium text-[12px]">
              {invoice.invoiceDate}
            </MainLayoutColor>
          </div>

          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
              Billing Profile
            </MainLayoutColor>
            <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium text-[12px]">
              {invoice.billingProfile}
            </MainLayoutColor>
          </div>

          <div className="flex items-center justify-between">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
              Balance past due on {invoice.dueDate}
            </MainLayoutColor>
            <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="font-bold text-[14px]">
              ₹{invoice.amount}
            </MainLayoutColor>
          </div>
        </div>

        {/* Total Amount Row */}
        <div className="flex items-center justify-between">
          <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium text-[12px]">
            Amount to be paid
          </MainLayoutColor>
          <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="font-bold text-[15px]">
            ₹{invoice.amount}
          </MainLayoutColor>
        </div>

        {/* Payment Method Selector */}
        <div className="relative">
          <div className="w-full h-11 px-4 rounded-xl bg-[#18181b]/80 border border-[#27272a] flex items-center justify-between cursor-pointer hover:border-[#3f3f46] transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="font-bold tracking-tighter text-[10px] px-1.5 py-0.5 rounded bg-white text-black leading-none">
                UPI
              </span>
              <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium text-[12px]">
                {selectedMethod}
              </MainLayoutColor>
            </div>
            <ChevronDown size={15} className="text-[#71717a]" />
          </div>
        </div>

        {/* Action Button */}
        <MainHeaderActionButton
          type="button"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-yellow,#ffd60a)] hover:bg-[#e6c200] active:scale-[0.99] text-black font-bold border border-[var(--color-yellow,#ffd60a)] transition-all cursor-pointer shadow-md"
        >
          <span className="text-[14px] font-bold text-black whitespace-nowrap leading-none">
            Pay Now
          </span>
        </MainHeaderActionButton>
      </MainLayoutColor>
    </div>
  );
}