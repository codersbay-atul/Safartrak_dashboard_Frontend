import React, { useState } from "react";
import {
  RotateCw,
  Upload,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Check,
  Ban,
} from "lucide-react";
import squareIcon from "../../assets/images/square.svg";

const INVOICES_DATA = [
  {
    id: "G177502127",
    invoiceDate: "8/11/2026",
    billingPeriod: "8/10/2026",
    totalAmount: "₹3,091.31",
    status: "Past Due",
    hasPayNow: true,
  },
  {
    id: "G177502126",
    invoiceDate: "8/9/2026",
    billingPeriod: "8/10/2026",
    totalAmount: "₹407.66",
    status: "Paid",
    hasPayNow: false,
  },
  {
    id: "G177502125",
    invoiceDate: "8/8/2026",
    billingPeriod: "8/10/2026",
    totalAmount: "-₹930.82",
    status: "Void",
    hasPayNow: false,
  },
];

export default function BillPaymentTable({ onPayNow }) {
  const [searchTerm, setSearchTerm] = useState("");

  const renderStatus = (status) => {
    switch (status.toLowerCase()) {
      case "past due":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#2a0e10] text-[#ef4444] border border-[#ef4444]/30">
            <AlertCircle size={11} className="stroke-[2.5]" />
            Past Due
          </span>
        );
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#0b2416] text-[#22c55e] border border-[#22c55e]/30">
            <Check size={11} className="stroke-[2.5]" />
            Paid
          </span>
        );
      case "void":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#1e2025] text-[#9ca3af] border border-[#374151]">
            <Ban size={11} className="stroke-[2.5]" />
            Void
          </span>
        );
      default:
        return status;
    }
  };

  const filteredInvoices = INVOICES_DATA.filter((item) =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white tracking-wide">
        <img
          src={squareIcon}
          alt=""
          className="w-[18px] h-[18px] object-contain"
          style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(80%) saturate(1700%) hue-rotate(12deg) brightness(102%) contrast(101%)" }}
        />
        <span>Active Products</span>
      </h2>

      <div className="w-full h-full flex flex-col min-h-0 bg-[#0d0e12] border border-[#1d1d20] rounded-xl overflow-hidden select-none shadow-2xl text-[14px]">
        <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#1d1d20] shrink-0 bg-[#0d0e12] z-20 text-[12px]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <span>Status</span>
              <ChevronDown size={13} />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <span>Billing Profile</span>
              <ChevronDown size={13} />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <span>Timespan</span>
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <RotateCw size={12} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <Upload size={12} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14151a] border border-[#25272e] text-[#a1a1aa] hover:text-white hover:border-[#383a42] text-xs transition cursor-pointer"
            >
              <Download size={12} />
              <span>Download</span>
            </button>

            <div className="relative flex items-center min-w-[160px] sm:min-w-[180px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Invoice..."
                className="w-full h-8 pl-3.5 pr-8 bg-[#14151a] border border-[#25272e] rounded-full text-[12px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#4d505c] transition"
              />
              <Search
                size={13}
                className="absolute right-3 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full overflow-x-auto overflow-y-auto [scrollbar-width:thin]">
          <table className="w-full text-left text-xs border-collapse min-w-[950px]">
            <thead className="sticky top-0 bg-[#09090b] border-b border-[#1d1d20] z-10">
              <tr className="text-white text-[12px] font-normal uppercase tracking-wide">
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Invoice ID</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Invoice Date</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Billing Period</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Total Amount</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Status</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-white">Payment Action</th>
                <th className="py-3 px-5 whitespace-nowrap font-normal text-right text-white">Download Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d1d20]/50 bg-[#0d0e12] text-[#d4d4d8]">
              {filteredInvoices.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#13151b] transition-colors align-middle"
                >
                  <td className="py-4 px-5 font-normal whitespace-nowrap text-white">
                    {item.id}
                  </td>

                  <td className="py-4 px-5 font-normal whitespace-nowrap text-[#a1a1aa]">
                    {item.invoiceDate}
                  </td>

                  <td className="py-4 px-5 font-normal whitespace-nowrap text-[#a1a1aa]">
                    {item.billingPeriod}
                  </td>

                  <td className="py-4 px-5 font-normal whitespace-nowrap text-white">
                    {item.totalAmount}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap text-[12px]">
                    {renderStatus(item.status)}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap text-[12px]">
                    {item.hasPayNow ? (
                      <button
                        type="button"
                        onClick={onPayNow}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium bg-[#2a1b02] text-[#f59e0b] border border-[#f59e0b]/40 hover:bg-[#382404] transition cursor-pointer"
                      >
                        <span>Pay Now</span>
                        <ChevronRight size={12} className="stroke-[2.5]" />
                      </button>
                    ) : (
                      <span className="text-[#71717a] font-normal text-[12px]">N/A</span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[#F5B700] hover:text-[#d9a200] font-normal transition cursor-pointer text-[14px]"
                    >
                      <span>Download</span>
                      <Download size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}