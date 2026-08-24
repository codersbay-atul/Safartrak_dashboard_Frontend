import React, { useState } from "react";
import { Filter, Search, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutIcon from "../../components/Ui/MainLayoutUI/MainLayoutIcon";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
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
          <span
            key={`ellipsis-${idx}`}
            className="px-1.5 text-zinc-500 text-[11px] select-none"
          >
            ...
          </span>
        );
      }

      const isActive = currentPage === page;
      return (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-medium transition cursor-pointer ${
            isActive
              ? "border border-[#ffd60a] text-[#ffd60a] bg-[#ffd60a]/10"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const getStatusBadgeConfig = (status) => {
    const normalizeStatus = String(status || "").toLowerCase().trim();

    switch (normalizeStatus) {
      case "active":
        return {
          color: "greenStatusBadge",
          background: "greenStatusBadgeBg",
          border: "greenStatusBadgeBorder",
        };
      case "inactive":
        return {
          color: "inactiveStatusBadge",
          background: "inactiveStatusBadgeBg",
          border: "inactiveStatusBadgeBorder",
        };
      case "expired":
        return {
          color: "expiredStatusBadge",
          background: "expiredStatusBadgeBg",
          border: "expiredStatusBadgeBorder",
        };
      default:
        return {
          color: "inactiveStatusBadge",
          background: "inactiveStatusBadgeBg",
          border: "inactiveStatusBadgeBorder",
        };
    }
  };

  const getKycBadgeConfig = (kyc) => {
    const isYes = kyc === true || String(kyc || "").toLowerCase().trim() === "yes";

    if (isYes) {
      return {
        color: "kycYesStatusBadge",
        background: "kycYesStatusBadgeBg",
        border: "kycYesStatusBadgeBorder",
        text: "Yes",
      };
    }

    return {
      color: "kycNoStatusBadge",
      background: "kycNoStatusBadgeBg",
      border: "kycNoStatusBadgeBorder",
      text: "No",
    };
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
          <div className="w-3.5 h-3.5 rounded flex items-center justify-center border border-[#ffd60a] bg-[#ffd60a] transition-all">
            <Check size={10} strokeWidth={3} className="text-black" />
          </div>
        ) : (
          <div className="w-3.5 h-3.5 rounded flex items-center justify-center border border-[#3f3f46] bg-[#18181b] group-hover:border-[#71717a] transition-all" />
        )}
        <span className="text-[11.5px] text-zinc-300 group-hover:text-white transition-colors">
          {value}
        </span>
      </div>
    );
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.kycStatus.length > 0 ||
    filters.expiresOn.length > 0 ||
    filters.activatedOn.length > 0;

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-fit border border-[#27272a] rounded-2xl select-none font-sans shadow-2xl relative"
    >
      {/* Header Toolbar */}
      <div className="px-3.5 py-2 border-b border-[#27272a] shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block text-[13px]"
          >
            Active List
          </MainLayoutColor>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* MainDropDown Implementation */}
            <MainDropDown
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              className="!w-[320px] sm:!w-[320px] max-w-[calc(100vw-1rem)] right-0 p-3 flex flex-col gap-2.5 z-50 border-[#27272a] shadow-2xl text-left"
              customTrigger={
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] transition cursor-pointer font-medium ${
                    isFilterOpen || hasActiveFilters
                      ? "bg-[#27272a] border-[var(--color-yellow,#ffd60a)] text-white"
                      : "bg-[#18181b]/80 border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46]"
                  }`}
                >
                  <span>Filter</span>
                  <Filter
                    size={11}
                    className={
                      isFilterOpen || hasActiveFilters
                        ? "text-white"
                        : "text-[#a1a1aa]"
                    }
                  />
                </button>
              }
            >
              {/* Dropdown Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#27272a]">
                <span className="font-bold text-[13px] text-white">Filters</span>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="text-zinc-500 hover:text-white transition cursor-pointer p-0.5"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Filter List Body */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 pr-1">
                {/* Status */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-zinc-400">
                    Status
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                    {renderCheckbox("status", "Active")}
                    {renderCheckbox("status", "Inactive")}
                    {renderCheckbox("status", "Expired")}
                  </div>
                </div>

                {/* KYC Status */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-zinc-400">
                    KYC Status
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                    {renderCheckbox("kycStatus", "Compliant")}
                    {renderCheckbox("kycStatus", "Non-Compliant")}
                  </div>
                </div>

                {/* Expires On */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-zinc-400">
                    Expires On
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                    {renderCheckbox("expiresOn", "Expiring in 30 days")}
                    {renderCheckbox("expiresOn", "Expiring in 60 days")}
                    {renderCheckbox("expiresOn", "Expiring in 90 days")}
                  </div>
                </div>

                {/* Activated On */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-zinc-400">
                    Activated On
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0.5">
                    {renderCheckbox("activatedOn", "Last 30 days")}
                    {renderCheckbox("activatedOn", "Last 90 days")}
                    {renderCheckbox("activatedOn", "This year")}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272a] mt-1">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="py-1 px-2.5 rounded-lg border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 text-[11px] font-medium transition cursor-pointer text-center"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="py-1 px-2.5 rounded-lg bg-[var(--color-yellow,#ffd60a)] hover:bg-[#e6c200] text-black text-[11px] font-medium transition cursor-pointer text-center shadow-sm"
                >
                  Apply
                </button>
              </div>
            </MainDropDown>

            <div className="relative flex items-center w-[140px] sm:w-[160px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search ICCID..."
                className="w-full h-7 pl-2.5 pr-6 bg-[#18181b]/80 border border-[#27272a] rounded-full text-[11px] text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[var(--color-yellow,#ffd60a)] transition"
              />
              <Search
                size={11}
                className="absolute right-2 text-[#71717a] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#18181b]/40">
              <th className="py-2 px-3 pl-3.5">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-semibold text-[11.5px] block"
                >
                  ICCID Number
                </MainLayoutColor>
              </th>
              <th className="py-2 px-3">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-semibold text-[11.5px] block"
                >
                  KYC
                </MainLayoutColor>
              </th>
              <th className="py-2 px-3">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-medium text-[11.5px] block"
                >
                  Status
                </MainLayoutColor>
              </th>
              <th className="py-2 px-3">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-semibold text-[11.5px] block"
                >
                  Activated
                </MainLayoutColor>
              </th>
              <th className="py-2 px-3">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-semibold text-[11.5px] block"
                >
                  Plan Expires
                </MainLayoutColor>
              </th>
              <th className="py-2 px-3 pr-3.5">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="white"
                  size="subInfoText"
                  className="font-semibold text-[11.5px] block"
                >
                  Amount
                </MainLayoutColor>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50">
            {currentSims.length > 0 ? (
              currentSims.map((item) => {
                const statusVal = item.status ?? "Inactive";
                const statusBadge = getStatusBadgeConfig(statusVal);
                const kycBadge = getKycBadgeConfig(item.kyc);

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
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <MainLayoutIcon
                              name="check"
                              size="copy"
                              className="text-emerald-400"
                            />
                          ) : (
                            <MainLayoutIcon
                              name="copy"
                              size="copy"
                              className="text-zinc-400 group-hover:text-zinc-200"
                            />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <MainLayoutColor
                        as="span"
                        color={kycBadge.color}
                        background={kycBadge.background}
                        border={kycBadge.border}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full border"
                      >
                        <MainLayoutTextSize
                          size="badgeText"
                          className="font-medium text-[10.5px] whitespace-nowrap leading-none"
                        >
                          {kycBadge.text}
                        </MainLayoutTextSize>
                      </MainLayoutColor>
                    </td>

                    <td className="py-2.5 px-3">
                      <MainLayoutColor
                        as="span"
                        color={statusBadge.color}
                        background={statusBadge.background}
                        border={statusBadge.border}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full border"
                      >
                        <MainLayoutTextSize
                          size="badgeText"
                          className="font-medium whitespace-nowrap leading-none"
                        >
                          {statusVal}
                        </MainLayoutTextSize>
                      </MainLayoutColor>
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
                  className="py-5 text-center text-zinc-500 text-[12px]"
                >
                  No SIM records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Footer */}
      <div className="px-3.5 py-2 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-2 bg-[#18181b]/30">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-[11.5px] text-zinc-400"
        >
          {totalItems > 0
            ? `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} SIMs`
            : "Showing 0 of 0 SIMs"}
        </MainLayoutColor>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1 || totalItems === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={13} />
          </button>

          <div className="flex items-center gap-0.5">
            {renderPaginationButtons()}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages || totalItems === 0}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </MainLayoutColor>
  );
}