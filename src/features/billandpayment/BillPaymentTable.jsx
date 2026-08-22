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
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle size={11} className="stroke-[2.5]" />
            <MainLayoutTextSize size="badgeText" className="leading-none">
              Past Due
            </MainLayoutTextSize>
          </span>
        );
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Check size={11} className="stroke-[2.5]" />
            <MainLayoutTextSize size="badgeText" className="leading-none">
              Paid
            </MainLayoutTextSize>
          </span>
        );
      case "void":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
            <Ban size={11} className="stroke-[2.5]" />
            <MainLayoutTextSize size="badgeText" className="leading-none">
              Void
            </MainLayoutTextSize>
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
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* Title */}
      <h2 className="flex items-center gap-2 tracking-wide">
        <img
          src={squareIcon}
          alt=""
          className="w-[18px] h-[18px] object-contain"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(68%) sepia(80%) saturate(1700%) hue-rotate(12deg) brightness(102%) contrast(101%)",
          }}
        />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-wide block text-[14px]"
        >
          Active Products
        </MainLayoutColor>
      </h2>

      {/* Surface Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full h-full flex flex-col min-h-0 border border-[#27272a] rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Table Toolbar */}
        <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#27272a] shrink-0 z-20">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Status
              </MainLayoutColor>
              <ChevronDown size={13} className="text-[#a1a1aa]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Billing Profile
              </MainLayoutColor>
              <ChevronDown size={13} className="text-[#a1a1aa]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Timespan
              </MainLayoutColor>
              <ChevronDown size={13} className="text-[#a1a1aa]" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <RotateCw size={12} className="text-[#a1a1aa]" />
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Refresh
              </MainLayoutColor>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <Upload size={12} className="text-[#a1a1aa]" />
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Upload
              </MainLayoutColor>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <Download size={12} className="text-[#a1a1aa]" />
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Download
              </MainLayoutColor>
            </button>

            <div className="relative flex items-center min-w-[160px] sm:min-w-[180px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Invoice..."
                className="w-full h-8 pl-3.5 pr-8 bg-[#18181b]/80 border border-[#27272a] rounded-full text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition"
              />
              <Search
                size={13}
                className="absolute right-3 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 min-h-0 w-full overflow-x-auto overflow-y-auto [scrollbar-width:thin] custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead className="sticky top-0 bg-[#18181b]/60 border-b border-[#27272a] z-10 uppercase">
              <tr>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Invoice ID
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Invoice Date
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Billing Period
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Total Amount
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Status
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Payment Action
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-5 whitespace-nowrap text-right">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                    Download Invoice
                  </MainLayoutColor>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/50">
              {filteredInvoices.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#18181b]/50 transition-colors align-middle cursor-pointer"
                >
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="sectionTitle"
                      className="font-medium text-[14px] block"
                    >
                      {item.id}
                    </MainLayoutColor>
                  </td>

                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="sectionTitle"
                      className="font-normal text-[14px] block"
                    >
                      {item.invoiceDate}
                    </MainLayoutColor>
                  </td>

                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="sectionTitle"
                      className="font-normal text-[14px] block"
                    >
                      {item.billingPeriod}
                    </MainLayoutColor>
                  </td>

                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="sectionTitle"
                      className="font-medium text-[14px] block"
                    >
                      {item.totalAmount}
                    </MainLayoutColor>
                  </td>

                  <td className="py-3.5 px-5 whitespace-nowrap">
                    {renderStatus(item.status)}
                  </td>

                  <td className="py-3.5 px-5 whitespace-nowrap">
                    {item.hasPayNow ? (
                      <button
                        type="button"
                        onClick={onPayNow}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer"
                      >
                        <MainLayoutTextSize size="badgeText" className="font-medium leading-none">
                          Pay Now
                        </MainLayoutTextSize>
                        <ChevronRight size={12} className="stroke-[2.5]" />
                      </button>
                    ) : (
                      <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px] block">
                        N/A
                      </MainLayoutColor>
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[var(--color-yellow,#ffd60a)] hover:text-[#e6c200] font-normal transition cursor-pointer"
                    >
                      <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="text-[14px] text-[var(--color-yellow,#ffd60a)] hover:text-[#e6c200]">
                        Download
                      </MainLayoutColor>
                      <Download size={13} className="text-[var(--color-yellow,#ffd60a)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MainLayoutColor>
    </div>
  );
}