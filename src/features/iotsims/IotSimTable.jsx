import React, { useState } from "react";
import { Filter, ChevronLeft, ChevronRight, X, Check, Cpu } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutIcon from "../../components/Ui/MainLayoutUI/MainLayoutIcon";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";
import { SIMS_DATA } from "../../data/IotSimData";

export default function IotSimTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    status: [],
    kycStatus: [],
    expiresOn: [],
    activatedOn: [],
  });

  const handleCopy = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

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
      kycStatus: [],
      expiresOn: [],
      activatedOn: [],
    });
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const filteredSims = SIMS_DATA.filter((item) => {
    const matchesSearch = item.iccidNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 ||
      filters.status.some(
        (s) => s.toLowerCase() === String(item.status || "").toLowerCase()
      );

    const isItemKycCompliant =
      item.kyc === true || String(item.kyc || "").toLowerCase().trim() === "yes";
    const matchesKyc =
      filters.kycStatus.length === 0 ||
      (filters.kycStatus.includes("Compliant") && isItemKycCompliant) ||
      (filters.kycStatus.includes("Non-Compliant") && !isItemKycCompliant);

    return matchesSearch && matchesStatus && matchesKyc;
  });

  const totalItems = filteredSims.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentSims = filteredSims.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages.map((page, idx) => {
      if (page === "...") {
        return (
          <MainLayoutColor
            key={`ellipsis-${idx}`}
            as="span"
            color="subtitle"
            size="subInfoText"
            className="px-1.5 select-none text-[#71717a]"
          >
            ...
          </MainLayoutColor>
        );
      }

      const isActive = currentPage === page;
      return (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] border transition-all cursor-pointer select-none ${
            isActive
              ? "bg-[#FDB914] text-black border-[#FDB914] font-bold shadow-md"
              : "bg-transparent text-[#a1a1aa] border-[#232329] hover:border-[#FDBB24]/35 hover:text-white"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const renderCheckbox = (category, value) => {
    const isChecked = filters[category]?.includes(value);
    return (
      <div
        onMouseDown={(event) => event.stopPropagation()}
        onClick={() => toggleFilter(category, value)}
        className="flex items-center gap-2 cursor-pointer group py-0.5 select-none"
      >
        {isChecked ? (
          <div className="w-3.5 h-3.5 rounded flex items-center justify-center bg-[#FDB914] transition-all shrink-0">
            <Check size={10} strokeWidth={3} className="text-black" />
          </div>
        ) : (
          <MainLayoutColor
            as="div"
            background="surface"
            border="cardBorder"
            borderHover="cardBorderHover"
            className="w-3.5 h-3.5 rounded flex items-center justify-center transition-all shrink-0"
          />
        )}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="group-hover:text-white transition-colors"
        >
          {value}
        </MainLayoutColor>
      </div>
    );
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.kycStatus.length > 0 ||
    filters.expiresOn.length > 0 ||
    filters.activatedOn.length > 0;

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* Outside Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={Cpu}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block"
          >
            Active List
          </MainLayoutColor>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {/* Custom Multi-Filter Dropdown */}
          <MainDropDown
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            className="!w-[320px] sm:!w-[320px] max-w-[calc(100vw-1rem)] right-0 p-3 flex flex-col gap-2.5 z-50 shadow-2xl text-left"
            customTrigger={
              <MainLayoutFilterButton
                isActive={isFilterOpen || hasActiveFilters}
                onClick={() => setIsFilterOpen((prev) => !prev)}
              >
                <MainLayoutTextSize size="filterText">Filter</MainLayoutTextSize>
                <Filter size={11} className="shrink-0" />
              </MainLayoutFilterButton>
            }
          >
            {/* Dropdown Header */}
            <MainLayoutColor
              as="div"
              border="cardBorder"
              className="flex items-center justify-between pb-1.5 border-b"
            >
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
                className="hover:text-white transition cursor-pointer p-0.5"
              >
                <X size={14} />
              </MainLayoutColor>
            </MainLayoutColor>

            {/* Filter List Body */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 pr-1">
              {/* Status */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-semibold"
                >
                  Status
                </MainLayoutColor>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                  {renderCheckbox("status", "Active")}
                  {renderCheckbox("status", "Inactive")}
                  {renderCheckbox("status", "Expired")}
                </div>
              </div>

              {/* KYC Status */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-semibold"
                >
                  KYC Status
                </MainLayoutColor>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                  {renderCheckbox("kycStatus", "Compliant")}
                  {renderCheckbox("kycStatus", "Non-Compliant")}
                </div>
              </div>

              {/* Expires On */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-semibold"
                >
                  Expires On
                </MainLayoutColor>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                  {renderCheckbox("expiresOn", "Expiring in 30 days")}
                  {renderCheckbox("expiresOn", "Expiring in 60 days")}
                  {renderCheckbox("expiresOn", "Expiring in 90 days")}
                </div>
              </div>

              {/* Activated On */}
              <div className="flex flex-col gap-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-semibold"
                >
                  Activated On
                </MainLayoutColor>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                  {renderCheckbox("activatedOn", "Last 30 days")}
                  {renderCheckbox("activatedOn", "Last 90 days")}
                  {renderCheckbox("activatedOn", "This year")}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <MainLayoutColor
              as="div"
              border="cardBorder"
              className="grid grid-cols-2 gap-2 pt-2 border-t mt-1"
            >
              <MainLayoutColor
                as="button"
                type="button"
                background="filterBg"
                border="filterBorder"
                color="subtitle"
                onClick={handleResetFilters}
                className="py-1 px-2.5 rounded-lg text-[11px] font-medium transition cursor-pointer text-center hover:text-white"
              >
                Reset
              </MainLayoutColor>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="py-1 px-2.5 rounded-lg bg-[#FDB914] text-black text-[11px] font-medium transition cursor-pointer text-center shadow-sm hover:opacity-90"
              >
                Apply
              </button>
            </MainLayoutColor>
          </MainDropDown>

          {/* Centralized Search Input */}
          <div className="w-[140px] sm:w-[160px]">
            <MainSearchInput
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ICCID..."
              iconPosition="right"
              className="w-full py-0.5 px-2.5"
            />
          </div>
        </div>
      </div>

      {/* Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-fit rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b"
              >
                <MainTableHeader className="py-2 px-3 pl-3.5">
                  ICCID Number
                </MainTableHeader>
                <MainTableHeader className="py-2 px-3">
                  KYC
                </MainTableHeader>
                <MainTableHeader className="py-2 px-3">
                  Status
                </MainTableHeader>
                <MainTableHeader className="py-2 px-3">
                  Activated
                </MainTableHeader>
                <MainTableHeader className="py-2 px-3">
                  Plan Expires
                </MainTableHeader>
                <MainTableHeader className="py-2 px-3 pr-3.5">
                  Amount
                </MainTableHeader>
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#27272a]/50">
              {currentSims.length > 0 ? (
                currentSims.map((item) => {
                  const isKycYes =
                    item.kyc === true ||
                    String(item.kyc || "").toLowerCase().trim() === "yes";

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#18181b]/50 transition-colors align-middle cursor-pointer"
                    >
                      {/* ICCID Column with Copy Button */}
                      <td className="py-2.5 px-3 pl-3.5">
                        <div className="flex items-center gap-1.5 group w-fit">
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="title"
                            size="sectionTitle"
                            className="font-medium text-[13px] tracking-tight block"
                          >
                            {item.iccidNumber}
                          </MainLayoutColor>

                          <button
                            type="button"
                            title="Copy ICCID"
                            onClick={(e) => handleCopy(e, item.iccidNumber, item.id)}
                            className="p-1 rounded text-[#a1a1aa] hover:text-white transition cursor-pointer"
                          >
                            {copiedId === item.id ? (
                              <Check size={12} className="stroke-[2.5] text-[#FDB914]" />
                            ) : (
                              <MainLayoutIcon
                                name="copy"
                                size="copy"
                                className="group-hover:text-white"
                              />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* KYC Badge Column */}
                      <td className="py-2.5 px-3">
                        <MainStatusBadge
                          status={isKycYes ? "Yes" : "Expired"}
                          showDot={false}
                        />
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-2.5 px-3">
                        <MainStatusBadge
                          status={item.status || "Inactive"}
                          showDot={false}
                        />
                      </td>

                      <td className="py-2.5 px-3">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-normal text-[13px] block"
                        >
                          {item.activatedOn}
                        </MainLayoutColor>
                      </td>

                      <td className="py-2.5 px-3">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-normal text-[13px] block"
                        >
                          {item.expiresOn}
                        </MainLayoutColor>
                      </td>

                      <td className="py-2.5 px-3 pr-3.5">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-normal text-[13px] block"
                        >
                          {item.amount}
                        </MainLayoutColor>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-5 text-center"
                  >
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      No SIM records found.
                    </MainLayoutColor>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Footer */}
        <MainLayoutColor
          as="div"
          border="cardBorder"
          background="surface"
          className="px-3.5 py-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="text-[11.5px]"
          >
            {totalItems > 0
              ? `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} SIMs`
              : "Showing 0 of 0 SIMs"}
          </MainLayoutColor>

          <div className="flex items-center gap-1">
            <MainLayoutColor
              as="button"
              type="button"
              border="cardBorder"
              borderHover="cardBorderHover"
              color="subtitle"
              disabled={currentPage === 1 || totalItems === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-6 h-6 flex items-center justify-center rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer hover:text-white"
            >
              <ChevronLeft size={13} />
            </MainLayoutColor>

            <div className="flex items-center gap-1">
              {renderPaginationButtons()}
            </div>

            <MainLayoutColor
              as="button"
              type="button"
              border="cardBorder"
              borderHover="cardBorderHover"
              color="subtitle"
              disabled={currentPage === totalPages || totalItems === 0}
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-6 h-6 flex items-center justify-center rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer hover:text-white"
            >
              <ChevronRight size={13} />
            </MainLayoutColor>
          </div>
        </MainLayoutColor>
      </MainLayoutColor>
    </div>
  );
}