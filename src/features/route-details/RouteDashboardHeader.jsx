import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatFormattedDate(date) {
  if (!date) return "";
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function CustomCalendarPopover({
  initialStart,
  initialEnd,
  onSave,
  onReset,
  onClose,
}) {
  const [viewDate, setViewDate] = useState(
    initialStart ? new Date(initialStart) : new Date()
  );
  const [startDate, setStartDate] = useState(
    initialStart ? new Date(initialStart) : null
  );
  const [endDate, setEndDate] = useState(
    initialEnd ? new Date(initialEnd) : null
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const calendarCells = React.useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      cells.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return cells;
  }, [year, month]);

  const handleDateClick = (cellDate) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(cellDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (cellDate < startDate) {
        setStartDate(cellDate);
      } else {
        setEndDate(cellDate);
      }
    }
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDayInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    if (onReset) onReset();
  };

  const handleSave = () => {
    if (onSave) onSave(startDate, endDate);
    if (onClose) onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[240px] bg-[#09090b] border border-[#27272a] rounded-2xl p-3 shadow-2xl z-[9999] text-white font-sans select-none animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-white tracking-wide">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAY_LABELS.map((day) => (
          <span key={day} className="text-[10px] font-medium text-zinc-500 py-0.5">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {calendarCells.map((cell, idx) => {
          const isStart = isSameDay(cell.date, startDate);
          const isEnd = isSameDay(cell.date, endDate);
          const inRange = isDayInRange(cell.date);

          let cellStyle = "text-zinc-300 hover:bg-[#18181b] rounded-md";

          if (!cell.isCurrentMonth) {
            cellStyle = "text-zinc-600 hover:bg-[#18181b] rounded-md";
          }

          if (isStart || isEnd) {
            cellStyle = "bg-white text-black font-bold rounded-lg shadow-md";
          } else if (inRange) {
            cellStyle = "bg-[#27272a] text-zinc-200 rounded-md";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleDateClick(cell.date)}
              className={`h-7 w-7 text-[11px] flex items-center justify-center transition-all cursor-pointer ${cellStyle}`}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-[#18181b]">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 py-1.5 rounded-xl bg-[#FDBB24] hover:bg-[#e0a720] text-xs font-bold text-black transition-colors cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default function RouteDashboardHeader({ onSearch, onDateRangeChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    if (onDateRangeChange) {
      onDateRangeChange({ start, end });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const formattedRangeText =
    startDate && endDate
      ? `From ${formatFormattedDate(startDate)} to ${formatFormattedDate(endDate)}`
      : startDate
      ? `From ${formatFormattedDate(startDate)}`
      : "Select Date Range";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full select-none py-2 px-1 bg-black text-white shrink-0 relative z-[9999]">
      <div className="min-w-0 shrink">
        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug truncate">
          Current Route
        </h1>
        <p className="text-xs sm:text-[13px] text-zinc-400 leading-tight truncate">
          Track the selected vehicle's current trip and route progress.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap relative z-[9999]">
        <div className="relative z-[9999]" ref={popoverRef}>
          <button
            type="button"
            onClick={() => setShowCalendar((prev) => !prev)}
            className="flex items-center justify-between gap-3 px-4 py-1.5 text-xs text-zinc-300 bg-[#09090b] border border-[#27272a] rounded-full hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
          >
            <span>{formattedRangeText}</span>
            <Calendar size={14} className="text-zinc-400 shrink-0" />
          </button>

          {showCalendar && (
            <CustomCalendarPopover
              initialStart={startDate}
              initialEnd={endDate}
              onSave={handleSaveDates}
              onReset={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        <div className="relative flex-1 sm:w-[220px] shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Vehicle.."
            className="w-full pl-4 pr-9 py-1.5 text-xs text-white bg-[#09090b] border border-[#27272a] rounded-full placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all"
          />
          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}