import React, { useState } from "react";
import { Filter, ArrowUpDown, Search } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const PRODUCTS_DATA = [
  {
    id: "1",
    productName: "Fleet Management Software",
    assignedLicense: 35,
    availableLicense: 16,
    status: "Active",
    renewalDate: "31 Jul 2027",
    billingProfile: "Zevon Systems LLP",
    purchaseChannel: "Commercial direct",
    productType: "License- Based",
    pricingModel: "Paid",
  },
  {
    id: "2",
    productName: "Fuel Management System",
    assignedLicense: 25,
    availableLicense: 12,
    status: "Pending",
    renewalDate: "03 Aug 2027",
    billingProfile: "Growing Services Pvt. Ltd.",
    purchaseChannel: "Commercial direct",
    productType: "License- Based",
    pricingModel: "Paid",
  },
  {
    id: "3",
    productName: "ST100",
    assignedLicense: 40,
    availableLicense: 24,
    status: "Expired",
    renewalDate: "Lifetime",
    billingProfile: "Growing Services Pvt. Ltd.",
    purchaseChannel: "Commercial direct",
    productType: "License- Based",
    pricingModel: "Paid",
  },
];

export default function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "expired":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default:
        return "bg-[#18181b] text-[#a1a1aa] border border-[#27272a]";
    }
  };

  const filteredProducts = PRODUCTS_DATA.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-fit border border-[#27272a] rounded-2xl overflow-hidden select-none font-sans shadow-2xl"
    >
      {/* Table Toolbar / Header */}
      <div className="px-4 py-3 flex flex-col gap-3 border-b border-[#27272a] shrink-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[14px]"
          >
            Active Products
          </MainLayoutColor>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Filter
              </MainLayoutColor>
              <Filter size={12} className="text-[#a1a1aa]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[12px] transition cursor-pointer"
            >
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="text-[12px]">
                Sort
              </MainLayoutColor>
              <ArrowUpDown size={12} className="text-[#a1a1aa]" />
            </button>

            <div className="relative flex items-center w-[150px] sm:w-[170px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="w-full h-8 pl-3 pr-7 bg-[#18181b]/80 border border-[#27272a] rounded-full text-[12px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition"
              />
              <Search
                size={12}
                className="absolute right-2.5 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto [scrollbar-width:thin] custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#18181b]/40 uppercase">
              <th className="py-2.5 px-3 pl-4">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Product Name
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Assigned
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Available
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Status
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Renewal Date
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Billing Profile
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Purchase Channel
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Product Type
                </MainLayoutColor>
              </th>
              <th className="py-2.5 px-3 pr-4">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-semibold text-[12px] block">
                  Pricing Model
                </MainLayoutColor>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50">
            {filteredProducts.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#18181b]/50 transition-colors align-middle cursor-pointer"
              >
                <td className="py-3 px-3 pl-4">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="title"
                    size="sectionTitle"
                    className="font-medium text-[14px] block"
                  >
                    {item.productName}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.assignedLicense}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.availableLicense}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    <MainLayoutTextSize size="badgeText" className="font-medium text-[11px] whitespace-nowrap leading-none">
                      {item.status}
                    </MainLayoutTextSize>
                  </span>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.renewalDate}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.billingProfile}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.purchaseChannel}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.productType}
                  </MainLayoutColor>
                </td>

                <td className="py-3 px-3 pr-4">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                    className="font-normal text-[14px] block"
                  >
                    {item.pricingModel}
                  </MainLayoutColor>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayoutColor>
  );
}