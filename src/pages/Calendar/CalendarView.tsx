import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import "./CalendarPage.css";

interface CalendarViewProps {
  excludedDates: string[];
}

function CalendarView({ excludedDates }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();

  const formatDate = (day: number) => {
    const date = new Date(year, month, day);

    const monthValue = String(date.getMonth() + 1).padStart(2, "0");
    const dayValue = String(date.getDate()).padStart(2, "0");

    return `${date.getFullYear()}-${monthValue}-${dayValue}`;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button
          type="button"
          className="icon-button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="calendar-month">
          <CalendarDays size={20} />
          <strong>
            {monthName} {year}
          </strong>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div key={day}>{day}</div>
          ),
        )}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="calendar-day calendar-day-empty"
          />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateValue = formatDate(day);

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          const isExcluded = excludedDates.includes(dateValue);

          return (
            <div
              key={dateValue}
              className={`calendar-day ${
                isToday ? "calendar-day-today" : ""
              } ${isExcluded ? "calendar-day-excluded" : ""}`}
            >
              <span>{day}</span>

              {isExcluded && (
                <small>Excluded</small>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;