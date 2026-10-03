import { useAppSelector } from "../../app/hooks";
import CalendarView from "./CalendarView";
import "./CalendarPage.css";

function CalendarPage() {
  const currentUser = useAppSelector(
  (state) => state.auth.currentUser,
);

const schedules = useAppSelector((state) =>
  state.schedules.schedules.filter(
    (schedule) => schedule.userId === currentUser?.id,
  ),
);

  const excludedDates = schedules.flatMap(
    (schedule) => schedule.excludedDates,
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Calendar</h1>
          <p>
            View your scheduled dates and excluded dates.
          </p>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-card">
          <CalendarView excludedDates={excludedDates} />
        </div>

        <div className="calendar-card">
          <h2>Calendar information</h2>

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot legend-today" />
              <span>Today</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-excluded" />
              <span>Excluded date</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-scheduled" />
              <span>Scheduled message</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-holiday" />
              <span>Holiday</span>
            </div>
          </div>

          <p className="calendar-note">
            Holidays will be loaded automatically based on
            the country and state selected for your schedule.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;