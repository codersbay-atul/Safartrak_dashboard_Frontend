import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";

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

/* ==========================================================================
   1. PURANA SINGLE RANGE CALENDAR POPOVER (COMMENTED OUT)
   ==========================================================================
function CustomCalendarPopover({ initialStart, initialEnd, onSave, onReset, onClose }) {
  const [viewDate, setViewDate] = useState(initialStart ? new Date(initialStart) : new Date());
  const [startDate, setStartDate] = useState(initialStart ? new Date(initialStart) : null);
  const [endDate, setEndDate] = useState(initialEnd ? new Date(initialEnd) : null);

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
      cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      cells.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return cells;
  }, [year, month]);

  const handleDateClick = (cellDate) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(cellDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (cellDate < startDate) setStartDate(cellDate);
      else setEndDate(cellDate);
    }
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  const isDayInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[240px] bg-[#09090b] border border-[#27272a] rounded-2xl p-3 shadow-2xl z-[9999] text-white font-sans select-none animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between mb-3 px-1">
        <button type="button" onClick={handlePrevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-white tracking-wide">{MONTH_NAMES[month]} {year}</span>
        <button type="button" onClick={handleNextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAY_LABELS.map((day) => (<span key={day} className="text-[10px] font-medium text-zinc-500 py-0.5">{day}</span>))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {calendarCells.map((cell, idx) => {
          const isStart = isSameDay(cell.date, startDate);
          const isEnd = isSameDay(cell.date, endDate);
          const inRange = isDayInRange(cell.date);
          let cellStyle = "text-zinc-300 hover:bg-[#18181b] rounded-md";
          if (!cell.isCurrentMonth) cellStyle = "text-zinc-600 hover:bg-[#18181b] rounded-md";
          if (isStart || isEnd) cellStyle = "bg-white text-black font-bold rounded-lg shadow-md";
          else if (inRange) cellStyle = "bg-[#27272a] text-zinc-200 rounded-md";

          return (
            <button key={idx} type="button" onClick={() => handleDateClick(cell.date)} className={`h-7 w-7 text-[11px] flex items-center justify-center transition-all cursor-pointer ${cellStyle}`}>
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-[#18181b]">
        <button type="button" onClick={() => { setStartDate(null); setEndDate(null); if (onReset) onReset(); }} className="flex-1 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-xs font-semibold text-white transition-colors cursor-pointer">Reset</button>
        <button type="button" onClick={() => { if (onSave) onSave(startDate, endDate); if (onClose) onClose(); }} className="flex-1 py-1.5 rounded-xl bg-[#FDBB24] hover:bg-[#e0a720] text-xs font-bold text-black transition-colors cursor-pointer">Save</button>
      </div>
    </div>
  );
}
========================================================================== */

function SingleDatePickerPopover({ title, initialDate, onSave, onReset, onClose }) {
  const [viewDate, setViewDate] = useState(initialDate ? new Date(initialDate) : new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : null);

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
      cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      cells.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return cells;
  }, [year, month]);

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[240px] bg-[#09090b] border border-[#27272a] rounded-2xl p-3 shadow-2xl z-[9999] text-white font-sans select-none animate-in fade-in zoom-in-95 duration-150">
      <div className="text-[11px] font-bold text-[#FDBB24] mb-2 px-1 tracking-wide uppercase">
        {title}
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <button type="button" onClick={handlePrevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-white tracking-wide">{MONTH_NAMES[month]} {year}</span>
        <button type="button" onClick={handleNextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAY_LABELS.map((day) => (
          <span key={day} className="text-[10px] font-medium text-zinc-500 py-0.5">{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {calendarCells.map((cell, idx) => {
          const isSelected = isSameDay(cell.date, selectedDate);
          let cellStyle = "text-zinc-300 hover:bg-[#18181b] rounded-md";
          if (!cell.isCurrentMonth) cellStyle = "text-zinc-600 hover:bg-[#18181b] rounded-md";
          if (isSelected) cellStyle = "bg-[#FDBB24] text-black font-bold rounded-lg shadow-md";

          return (
            <button key={idx} type="button" onClick={() => setSelectedDate(cell.date)} className={`h-7 w-7 text-[11px] flex items-center justify-center transition-all cursor-pointer ${cellStyle}`}>
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-[#18181b]">
        <button type="button" onClick={() => { setSelectedDate(null); if (onReset) onReset(); }} className="flex-1 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-xs font-semibold text-white transition-colors cursor-pointer">Reset</button>
        <button type="button" onClick={() => { if (onSave) onSave(selectedDate); if (onClose) onClose(); }} className="flex-1 py-1.5 rounded-xl bg-[#FDBB24] hover:bg-[#e0a720] text-xs font-bold text-black transition-colors cursor-pointer">Save</button>
      </div>
    </div>
  );
}

export default function RouteDashboardHeader({ onSearch, onDateRangeChange }) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (startRef.current && !startRef.current.contains(event.target)) setShowStartCalendar(false);
      if (endRef.current && !endRef.current.contains(event.target)) setShowEndCalendar(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveStartDate = (date) => {
    setStartDate(date);
    if (onDateRangeChange) onDateRangeChange({ start: date, end: endDate });
  };

  const handleSaveEndDate = (date) => {
    setEndDate(date);
    if (onDateRangeChange) onDateRangeChange({ start: startDate, end: date });
  };

  const customRightAction = (
    <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap relative z-[9999]">
      <div className="relative z-[9999]" ref={startRef}>
        <button
          type="button"
          onClick={() => { setShowStartCalendar((prev) => !prev); setShowEndCalendar(false); }}
          className="flex items-center justify-between gap-2 px-3.5 py-1.5 text-xs text-zinc-300 bg-[#09090b] border border-[#27272a] rounded-full hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
        >
          <span>{startDate ? `Start: ${formatFormattedDate(startDate)}` : "Select Start Date"}</span>
          <Calendar size={14} className="text-zinc-400 shrink-0" />
        </button>

        {showStartCalendar && (
          <SingleDatePickerPopover
            title="Select Start Date"
            initialDate={startDate}
            onSave={handleSaveStartDate}
            onReset={() => { setStartDate(null); if (onDateRangeChange) onDateRangeChange({ start: null, end: endDate }); }}
            onClose={() => setShowStartCalendar(false)}
          />
        )}
      </div>

      <div className="relative z-[9999]" ref={endRef}>
        <button
          type="button"
          onClick={() => { setShowEndCalendar((prev) => !prev); setShowStartCalendar(false); }}
          className="flex items-center justify-between gap-2 px-3.5 py-1.5 text-xs text-zinc-300 bg-[#09090b] border border-[#27272a] rounded-full hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
        >
          <span>{endDate ? `End: ${formatFormattedDate(endDate)}` : "Select End Date"}</span>
          <Calendar size={14} className="text-zinc-400 shrink-0" />
        </button>

        {showEndCalendar && (
          <SingleDatePickerPopover
            title="Select End Date"
            initialDate={endDate}
            onSave={handleSaveEndDate}
            onReset={() => { setEndDate(null); if (onDateRangeChange) onDateRangeChange({ start: startDate, end: null }); }}
            onClose={() => setShowEndCalendar(false)}
          />
        )}
      </div>
    </div>
  );

  return (
    <PageHeader
      title="Current Route"
      subtitle="Track the selected vehicle's current trip and route progress."
      showBack={false}
      showSearch={true}
      searchPlaceholder="Search Vehicle.."
      onSearch={onSearch}
      showExport={false}
      showFilters={false}
      customRightAction={customRightAction}
    />
  );
}