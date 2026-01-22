import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export const DatePicker = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  required = false,
  className = "",
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "dd.MM.yyyy", { locale: de });
  };

  const handlePrevDay = () => {
    if (!value) return;
    const newDate = subDays(value, 1);
    if (minDate && newDate < minDate) return;
    onChange(newDate);
  };

  const handleNextDay = () => {
    if (!value) return;
    const newDate = addDays(value, 1);
    if (maxDate && newDate > maxDate) return;
    onChange(newDate);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Try to parse dd.mm.yyyy
    const parts = input.split(".");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        onChange(date);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-post-black">
          {label}
          {required && <span className="text-post-red ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrevDay}
          className="p-3 rounded-md border border-post-gray-200 bg-white hover:bg-post-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-post-gray-600" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={formatDate(value)}
            onChange={handleInputChange}
            placeholder="TT.MM.JJJJ"
            className="w-full px-4 py-3 pr-10 rounded-md border border-post-gray-200 bg-white
              focus:border-post-yellow focus:ring-1 focus:ring-post-yellow outline-none
              transition-colors duration-200"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-post-gray-400 pointer-events-none" />
        </div>

        <button
          type="button"
          onClick={handleNextDay}
          className="p-3 rounded-md border border-post-gray-200 bg-white hover:bg-post-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-post-gray-600" />
        </button>
      </div>
    </div>
  );
};
