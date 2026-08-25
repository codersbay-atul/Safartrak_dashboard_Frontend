import React, { useState } from "react";
import {
  RotateCw,
  Upload,
  Download,
  ChevronRight,
  Receipt,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

const STATUS_OPTIONS = [
  { label: "Status", value: "All" },
  { label: "Past Due", value: "Past Due" },
  { label: "Paid", value: "Paid" },
  { label: "Void", value: "Void" },
];

const BILLING_PROFILE_OPTIONS = [
  { label: "Billing Profile", value: "All" },
  { label: "Zevon Systems LLP", value: "Zevon Systems LLP" },
  { label: "Growing Services Pvt. Ltd.", value: "Growing Services Pvt. Ltd." },
];

const TIMESPAN_OPTIONS = [
  { label: "Timespan", value: "All" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Last Year", value: "1y" },
];

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
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedBillingProfile, setSelectedBillingProfile] = useState("All");
  const [selectedTimespan, setSelectedTimespan] = useState("All");

  const filteredInvoices = INVOICES_DATA.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* Outside Header Toolbar */}
      <div className="flex flex-col gap-2.5 px-1 shrink-0">
        {/* Title Row */}
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={Receipt}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight block"
          >
            Bill & Payment Invoices
          </MainLayoutColor>
        </div>

        {/* Controls Row: Uniform h-[34px] Height */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          {/* Left Side: Reusable Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <MainDropDown
              label="Status"
              options={STATUS_OPTIONS}
              selectedValue={selectedStatus}
              onSelect={(val) => setSelectedStatus(val)}
            />

            <MainDropDown
              label="Billing Profile"
              options={BILLING_PROFILE_OPTIONS}
              selectedValue={selectedBillingProfile}
              onSelect={(val) => setSelectedBillingProfile(val)}
            />

            <MainDropDown
              label="Timespan"
              options={TIMESPAN_OPTIONS}
              selectedValue={selectedTimespan}
              onSelect={(val) => setSelectedTimespan(val)}
            />
          </div>

          {/* Right Side: Action Buttons & Search */}
          <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {}}
              className="h-[34px] px-3.5 flex items-center gap-1.5 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] text-[#d4d4d8] hover:text-white rounded-full text-[12px] font-medium transition cursor-pointer"
            >
              <RotateCw size={11} className="shrink-0" />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => {}}
              className="h-[34px] px-3.5 flex items-center gap-1.5 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] text-[#d4d4d8] hover:text-white rounded-full text-[12px] font-medium transition cursor-pointer"
            >
              <Upload size={11} className="shrink-0" />
              <span>Upload</span>
            </button>

            <button
              type="button"
              onClick={() => {}}
              className="h-[34px] px-3.5 flex items-center gap-1.5 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] text-[#d4d4d8] hover:text-white rounded-full text-[12px] font-medium transition cursor-pointer"
            >
              <Download size={11} className="shrink-0" />
              <span>Download</span>
            </button>

            <div className="w-[160px] sm:w-[180px] shrink-0 h-[34px]">
              <MainSearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Invoice..."
                iconPosition="right"
                className="w-full h-[34px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Surface Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-fit flex flex-col rounded-2xl overflow-hidden shadow-2xl border"
      >
        <div className="w-full overflow-x-auto [scrollbar-width:thin] custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b"
              >
                <MainTableHeader className="py-3 px-5">
                  Invoice ID
                </MainTableHeader>
                <MainTableHeader className="py-3 px-5">
                  Invoice Date
                </MainTableHeader>
                <MainTableHeader className="py-3 px-5">
                  Billing Period
                </MainTableHeader>
                <MainTableHeader className="py-3 px-5">
                  Total Amount
                </MainTableHeader>
                <MainTableHeader className="py-3 px-5">
                  Status
                </MainTableHeader>
                <MainTableHeader className="py-3 px-5">
                  Payment Action
                </MainTableHeader>
                <MainTableHeader align="right" className="py-3 px-5">
                  Download Invoice
                </MainTableHeader>
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#27272a]/50">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#18181b]/50 transition-colors align-middle cursor-pointer"
                  >
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block"
                      >
                        {item.id}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subInfoText"
                        className="font-normal block"
                      >
                        {item.invoiceDate}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subInfoText"
                        className="font-normal block"
                      >
                        {item.billingPeriod}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block"
                      >
                        {item.totalAmount}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <MainStatusBadge status={item.status} showDot={false} />
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
                        <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="block">
                          N/A
                        </MainLayoutColor>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer"
                      >
                        <MainLayoutColor as={MainLayoutTextSize} color="yellow" size="sectionTitle">
                          Download
                        </MainLayoutColor>
                        <MainLayoutColor as={Download} color="yellow" size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                      No invoices found matching the criteria.
                    </MainLayoutColor>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MainLayoutColor>
    </div>
  );
}