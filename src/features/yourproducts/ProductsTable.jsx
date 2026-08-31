import React, { useState } from "react";
import {
  Filter,
  ArrowUpDown,
  Package,
  X,
  Check,
  HelpCircleIcon,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

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

export default function ProductsTable({ onHelpClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const [filters, setFilters] = useState({
    status: [],
    pricingModel: [],
  });

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      status: [],
      pricingModel: [],
    });
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    filters.status.length > 0 || filters.pricingModel.length > 0;

  const renderCheckbox = (category, value) => {
    const isChecked = filters[category]?.includes(value);
    return (
      <div
        onMouseDown={(event) => event.stopPropagation()}
        onClick={() => toggleFilter(category, value)}
        className="flex items-center gap-2 cursor-pointer group py-0.5 select-none"
      >
        {isChecked ? (
          <MainLayoutColor
            as="div"
            className="bg-[#FDB914] w-3.5 h-3.5 rounded flex items-center justify-center transition-all shrink-0"
          >
            <Check size={10} strokeWidth={3} className="text-black" />
          </MainLayoutColor>
        ) : (
          <MainLayoutColor
            as="div"
            background="surface"
            border="cardBorder"
            borderHover="filterBorderHover"
            className="w-3.5 h-3.5 rounded flex items-center justify-center transition-all shrink-0"
          />
        )}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="group-hover:text-white transition-colors text-[12px]"
        >
          {value}
        </MainLayoutColor>
      </div>
    );
  };

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 ||
      filters.status.some(
        (s) => s.toLowerCase() === String(item.status || "").toLowerCase()
      );

    const matchesPricing =
      filters.pricingModel.length === 0 ||
      filters.pricingModel.some(
        (p) =>
          p.toLowerCase() === String(item.pricingModel || "").toLowerCase()
      );

    return matchesSearch && matchesStatus && matchesPricing;
  }).sort((a, b) => {
    return sortAsc
      ? a.productName.localeCompare(b.productName)
      : b.productName.localeCompare(a.productName);
  });

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* Outside Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 mt-4">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={Package}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block"
          >
            Active Products
          </MainLayoutColor>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onHelpClick}
            className="cursor-pointer flex items-center gap-2 outline-none focus:outline-none"
          >
            <HelpCircleIcon size={16} className="text-[#FDB914]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="sectionTitle"
              className="font-bold tracking-tight block text-[14px] cursor-pointer"
            >
              Help me understand this table
            </MainLayoutColor>
          </button>

          {/* Reusable Filter Dropdown Trigger */}
          <MainDropDown
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            className="!w-[280px] sm:!w-[300px] max-w-[calc(100vw-1rem)] right-0 p-3 flex flex-col gap-2.5 z-50 shadow-2xl text-left border border-[#27272a] rounded-2xl"
            customTrigger={
              <MainLayoutFilterButton
                isActive={isFilterOpen || hasActiveFilters}
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="h-[34px] px-3.5 border border-[#27272a] hover:border-[#FDBB24]/40 rounded-full flex items-center gap-1.5 transition-colors outline-none focus:outline-none ring-0 focus:ring-0"
              >
                <MainLayoutTextSize size="metricText" className="border-none outline-none focus:outline-none shadow-none">
                  Filter
                </MainLayoutTextSize>
                <Filter size={12} className="shrink-0" />
              </MainLayoutFilterButton>
            }
          >
            {/* Filter Dropdown Header */}
            <div className="flex items-center justify-between pb-1.5">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-bold text-[13px]"
              >
                Filters
              </MainLayoutColor>
              <MainLayoutColor
                as="button"
                type="button"
                color="subtitle"
                onClick={() => setIsFilterOpen(false)}
                className="hover:text-white transition cursor-pointer p-0.5 outline-none focus:outline-none"
              >
                <X size={14} />
              </MainLayoutColor>
            </div>

            <div className="grid grid-cols-2 gap-3 pr-1">
              {/* Status Filter */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  // color="subtitle"
                  size="subInfoText"
                  // className="font-semibold text-[11px]"
                >
                  Status
                </MainLayoutColor>
                <div className="flex flex-col gap-1 pl-0.5">
                  {renderCheckbox("status", "Active")}
                  {renderCheckbox("status", "Pending")}
                  {renderCheckbox("status", "Expired")}
                </div>
              </div>

              {/* Pricing Model Filter */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  // color="subtitle"
                  size="subInfoText"
                  // className="font-semibold text-[11px]"
                >
                  Pricing
                </MainLayoutColor>
                <div className="flex flex-col gap-1 pl-0.5">
                  {renderCheckbox("pricingModel", "Paid")}
                  {renderCheckbox("pricingModel", "Free")}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272a] mt-1">
              <button
                type="button"
                onClick={handleResetFilters}
                className="py-1 px-2.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] text-[11px] font-medium transition cursor-pointer text-center hover:text-white outline-none focus:outline-none"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="py-1 px-2.5 rounded-lg bg-[#FDB914] text-black text-[11px] font-medium transition cursor-pointer text-center shadow-sm hover:opacity-90 border-none outline-none focus:outline-none"
              >
                Apply
              </button>
            </div>
          </MainDropDown>

          {/* Sort Button */}
          <MainLayoutFilterButton
            isActive={!sortAsc}
            onClick={() => setSortAsc((prev) => !prev)}
            className="h-[34px] px-3.5 border border-[#27272a] hover:border-[#FDBB24]/40 rounded-full flex items-center gap-1.5 transition-colors outline-none focus:outline-none ring-0 focus:ring-0"
          >
            <MainLayoutTextSize size="metricText" className="border-none outline-none focus:outline-none shadow-none">
              {sortAsc ? "Sort A-Z" : "Sort Z-A"}
            </MainLayoutTextSize>
            <ArrowUpDown size={12} className="shrink-0" />
          </MainLayoutFilterButton>

          <div className="w-[150px] sm:w-[170px] shrink-0 h-[34px]">
            <MainSearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product..."
              iconPosition="right"
              className="w-full h-[34px]"
            />
          </div>
        </div>
      </div>

      {/* Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-fit rounded-2xl overflow-hidden shadow-2xl border"
      >
        <div className="w-full overflow-x-auto [scrollbar-width:thin] custom-scrollbar">
          <table className="w-full table-fixed text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#121214] border-b border-[#232329] w-full">
                <th className="w-[11.11%] py-3 px-4 pl-5 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Product Name
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Assigned
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Available
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Status
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Renewal Date
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Billing Profile
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Purchase Channel
                </th>
                <th className="w-[11.11%] py-3 px-4 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Product Type
                </th>
                <th className="w-[11.11%] py-3 px-4 pr-5 text-[#a1a1aa] text-[12px] font-semibold truncate text-white">
                  Pricing Model
                </th>
              </tr>
            </thead>

            <tbody className="[&>tr:not(:last-child)>td]:border-b [&>tr:not(:last-child)>td]:border-[#232329]/40">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#1f2025] transition-colors align-middle cursor-pointer w-full"
                  >
                    <td className="w-[11.11%] py-3.5 px-4 pl-5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block truncate"
                      >
                        {item.productName}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.assignedLicense}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.availableLicense}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainStatusBadge status={item.status} showDot={false} />
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.renewalDate}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.billingProfile}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.purchaseChannel}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.productType}
                      </MainLayoutColor>
                    </td>

                    <td className="w-[11.11%] py-3.5 px-4 pr-5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {item.pricingModel}
                      </MainLayoutColor>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      No matching products found.
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