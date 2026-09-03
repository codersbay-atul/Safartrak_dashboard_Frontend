import React, { useState } from "react";
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ClipboardCheck,
  HelpCircleIcon,
  Download,
  ArrowDownToLine,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutIcon from "../../components/Ui/MainLayoutUI/MainLayoutIcon";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";
import {
  ASSIGN_VEHICLE_TRIPS_DUMMY,
  TRIP_STATUSES,
  getDriverInitials,
} from "./assignVehicleData";
import { downloadTripReportPdf } from "./downloadTripReportPdf";
import { toast } from "../../components/Ui/toast";

const AVATAR_PALETTE = [
  "bg-[#172554] text-[#3B82F6]",
  "bg-[#27272A] text-[#E4E4E7]",
  "bg-[#450A0A] text-[#F87171]",
];


const TRIP_STATUS_BADGE = {
  upcoming: "Idle",
  ongoing: "Active",
  delivered: "Pending",
  expired: "Expired",
};

function getTripStatusBadge(status) {
  const key = String(status || "").toLowerCase().trim();
  return TRIP_STATUS_BADGE[key] || "Expired";
}

export default function AssignVehicleTable({
  trips = ASSIGN_VEHICLE_TRIPS_DUMMY,
  isLoading = false,
  onHelpClick,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const itemsPerPage = 8;
  const [filters, setFilters] = useState({
    status: [],
  });

  const handleCopy = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDownloadReport = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const id = item.id ?? item.tripId;
    if (downloadingId === id) return;
    setDownloadingId(id);
    try {
      await downloadTripReportPdf(item);
      toast.success("Trip report download started");
    } catch (err) {
      toast.error(err?.message || "Unable to download trip report");
    } finally {
      setDownloadingId(null);
    }
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
    });
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const filteredTrips = (Array.isArray(trips) ? trips : []).filter((item) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      String(item.tripId || "").toLowerCase().includes(query) ||
      String(item.vehicleNumber || "").toLowerCase().includes(query) ||
      String(item.driverName || "").toLowerCase().includes(query);

    const matchesStatus =
      filters.status.length === 0 ||
      filters.status.some(
        (status) =>
          status.toLowerCase() === String(item.status || "").toLowerCase(),
      );

    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredTrips.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentTrips = filteredTrips.slice(startIndex, endIndex);

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
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage, "...", totalPages);
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
          className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-[12px] border transition-all cursor-pointer select-none ${
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

  const hasActiveFilters = filters.status.length > 0;

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* Outside Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 mt-4">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={ClipboardCheck}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block"
          >
            Recent Trip Assignments
          </MainLayoutColor>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
          {/* Help Button */}
          {/* <button
            type="button"
            onClick={onHelpClick}
            className="cursor-pointer flex items-center gap-2"
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
          </button> */}

          {/* Reusable Filter Dropdown Trigger */}
          <MainDropDown
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            className="!w-[340px] sm:!w-[360px] max-w-[calc(100vw-1rem)] right-0 p-4 flex flex-col gap-3 z-50 shadow-2xl text-left border border-[#27272a] rounded-2xl"
            customTrigger={
              <MainLayoutFilterButton
                isActive={isFilterOpen || hasActiveFilters}
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="h-[34px] px-3.5 border border-[#27272a] hover:border-[#FDBB24]/40 rounded-full flex items-center gap-1.5 transition-colors"
              >
                <MainLayoutTextSize size="filterText" className="!text-[12px] text-[12px] leading-none">
                  Filter
                </MainLayoutTextSize>
                <Filter size={11} className="shrink-0" />
              </MainLayoutFilterButton>
            }
          >
            {/* Dropdown Header */}
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
                className="hover:text-white transition cursor-pointer p-0.5"
              >
                <X size={14} />
              </MainLayoutColor>
            </div>

            {/* Filter List Body */}
            <div className="flex flex-col gap-1">
              <MainLayoutColor
                as={MainLayoutTextSize}
                size="subInfoText"
              >
                Status
              </MainLayoutColor>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pl-0.5">
                {TRIP_STATUSES.map((status) => renderCheckbox("status", status))}
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

          {/* <div className="w-[150px] sm:w-[170px] shrink-0 h-[34px]">
            <MainSearchInput
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Trip ID..."
              iconPosition="right"
              className="w-full h-[34px]"
            />
          </div> */}
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
          <table className="w-full table-fixed text-left border-collapse min-w-[860px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b w-full"
              >
                <MainTableHeader color="title" className="w-[16%] py-3 px-4 pl-5">
                  Trip ID
                </MainTableHeader>
                <MainTableHeader color="title" className="w-[14%] py-3 px-4">
                  Vehicle Number
                </MainTableHeader>
                {/* <MainTableHeader color="title" className="w-[16%] py-3 px-4">
                  Driver
                </MainTableHeader> */}
                <MainTableHeader color="title" className="w-[13%] py-3 px-4">
                  Status
                </MainTableHeader>
                <MainTableHeader color="title" className="w-[16%] py-3 px-4">
                  Pickup Date & Time
                </MainTableHeader>
                <MainTableHeader color="title" className="w-[16%] py-3 px-4">
                  Delivery Date & Time
                </MainTableHeader>
                <MainTableHeader color="title" className="w-[14%] py-3 px-4 pr-5">
                  Download Report
                </MainTableHeader>
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#1d1d20]/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      Loading trip assignments...
                    </MainLayoutColor>
                  </td>
                </tr>
              ) : currentTrips.length > 0 ? (
                currentTrips.map((item) => {
                  const driverName = item.driverName || "Unassigned";
                  const initials = getDriverInitials(driverName);
                  const isDownloading = downloadingId === (item.id ?? item.tripId);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1f2025] transition-colors align-middle w-full"
                    >
                      <td className="py-2 px-4 pl-5 truncate">
                        <div className="flex items-center gap-1.5 group w-fit max-w-full">
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="title"
                            size="sectionTitle"
                            className="font-medium block truncate"
                          >
                            <a
                              href={`#download-${item.tripId}`}
                              onClick={(event) => handleDownloadReport(event, item)}
                              className="hover:underline no-underline cursor-pointer"
                              title="Download trip report"
                            >
                              {item.tripId}
                            </a>
                          </MainLayoutColor>
                        </div>
                      </td>

                      <td className="py-2 px-4 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-normal block truncate"
                        >
                          {item.vehicleNumber}
                        </MainLayoutColor>
                      </td>

                      {/* <td className="py-2 px-4 truncate">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="sectionTitle"
                            className="font-medium block truncate"
                          >
                            {driverName}
                          </MainLayoutColor>
                        </div>
                      </td> */}

                      <td className="py-2 px-4 truncate">
                        <MainStatusBadge
                          status={getTripStatusBadge(item.status)}
                          label={item.status || "Upcoming"}
                          showDot={false}
                        />
                      </td>

                      <td className="py-2 px-4">
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="sectionTitle"
                            className="font-normal block truncate"
                          >
                            {item.pickupDate}{", "}
                            {item.pickupTime}
                          </MainLayoutColor>
                      </td>

                      <td className="py-2 px-4">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-normal block truncate"
                        >
                          {item.deliveryDate}{", "}
                          {item.deliveryTime}
                        </MainLayoutColor>
                      </td>

                      <td className="py-2 px-4 pr-5 truncate">
                        <button
                          type="button"
                          onClick={(event) => handleDownloadReport(event, item)}
                          disabled={isDownloading}
                          className={`inline-flex items-center gap-1.5 transition ${
                            isDownloading
                              ? "cursor-not-allowed"
                              : "hover:opacity-80 cursor-pointer"
                          }`}
                          title={isDownloading ? "Downloading" : "Download trip report"}
                        >
                          <MainLayoutColor
                            as={ArrowDownToLine}
                            color={isDownloading ? "muted" : "yellow"}
                            size={13}
                          />
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="yellow"
                            size="sectionTitle"
                          >
                            {isDownloading ? "Downloading" : "Download"}
                          </MainLayoutColor>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      No trip assignments found.
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
          className="px-4 py-2.5 border-t flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="text-[12px]"
          >
            {totalItems > 0
              ? `${endIndex} of ${totalItems} trips`
              : "Showing 0 of 0 trips"}
          </MainLayoutColor>

          <div className="flex items-center gap-1.5">
            <MainLayoutColor
              as="button"
              type="button"
              border="cardBorder"
              borderHover="cardBorderHover"
              color="subtitle"
              disabled={currentPage === 1 || totalItems === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer hover:text-white"
            >
              <ChevronLeft size={13} />
            </MainLayoutColor>

            <div className="flex items-center gap-1.5">
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
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer hover:text-white"
            >
              <ChevronRight size={13} />
            </MainLayoutColor>
          </div>
        </MainLayoutColor>
      </MainLayoutColor>
    </div>
  );
}
