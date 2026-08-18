import React, { useState } from "react";
import { Filter, ArrowUpDown, Search } from "lucide-react";

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
        return "bg-[#0c2417] text-[#22c55e]";
      case "pending":
        return "bg-[#291e0a] text-[#f59e0b]";
      case "expired":
        return "bg-[#270e0f] text-[#ef4444]";
      default:
        return "bg-[#18181b] text-[#a1a1aa]";
    }
  };

  const filteredProducts = PRODUCTS_DATA.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-[#0d0e12] border border-[#1d1d20] rounded-xl overflow-hidden select-none">
    
      <div className="px-4 py-3 flex flex-col gap-3 border-b border-[#1d1d20] shrink-0 bg-[#0d0e12] z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white tracking-wide">
            Active Products
          </h2>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[11px] transition cursor-pointer"
            >
              <span>Filter</span>
              <Filter size={12} />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-[11px] transition cursor-pointer"
            >
              <span>Sort</span>
              <ArrowUpDown size={12} />
            </button>

            <div className="relative flex items-center w-[150px] sm:w-[170px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="w-full h-8 pl-3 pr-7 bg-[#121215] border border-[#27272a] rounded-full text-[11px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#3f3f46] transition"
              />
              <Search
                size={12}
                className="absolute right-2.5 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 min-w-0 w-full overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="sticky top-0 bg-[#09090b] border-b border-[#1d1d20] z-10">
            <tr className="text-[#71717a] text-[12px] font-medium uppercase tracking-wider">
              <th className="py-2.5 px-3 pl-4  font-normal">Product Name</th>
              <th className="py-2.5 px-3 font-normal">Assigned</th>
              <th className="py-2.5 px-3 font-normal">Available</th>
              <th className="py-2.5 px-3 font-normal">Status</th>
              <th className="py-2.5 px-3 font-normal">Renewal Date</th>
              <th className="py-2.5 px-3 font-normal">Billing Profile</th>
              <th className="py-2.5 px-3 font-normal">Purchase Channel</th>
              <th className="py-2.5 px-3 font-normal">Product Type</th>
              <th className="py-2.5 px-3 pr-4 font-normal">Pricing Model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1d1d20]/50 text-[12px]">
            {filteredProducts.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#12121610] transition-colors text-[#d4d4d8] align-middle"
              >
                <td className="py-3 px-3 pl-4 font-normal">
                  {item.productName}
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.assignedLicense}
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.availableLicense}
                </td>

                <td className="py-3 px-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium leading-none ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.renewalDate}
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.billingProfile}
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.purchaseChannel}
                </td>

                <td className="py-3 px-3 font-normal text-[#a1a1aa]">
                  {item.productType}
                </td>

                <td className="py-3 px-3 pr-4 font-normal text-[#a1a1aa]">
                  {item.pricingModel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}