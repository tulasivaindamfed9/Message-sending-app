import { useNavigate } from "react-router-dom";
import { Power, Trash2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteSchedule,
  toggleSchedule,
} from "../../features/schedules/scheduleSlice";

import "./SchedulesPage.css";

function SchedulesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const schedules = useAppSelector(
    (state) => state.schedules.schedules,
  );

  const recipients = useAppSelector(
    (state) => state.recipients.recipients,
  );

  const getRecipientNames = (recipientIds: string[]) => {
    return recipientIds
      .map(
        (id) =>
          recipients.find((recipient) => recipient.id === id)?.name,
      )
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Schedules</h1>
          <p>Create and manage your scheduled messages.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/schedules/create")}
        >
          Create Schedule
        </button>
      </div>

      {schedules.length === 0 ? (
        <div className="empty-state">
          <h2>No schedules yet</h2>
          <p>
            Create your first Good Morning message schedule.
          </p>
        </div>
      ) : (
        <div className="schedules-list">
          {schedules.map((schedule) => (
            <div className="schedule-card" key={schedule.id}>
              <div className="schedule-card-content">
                <div className="schedule-card-title-row">
                  <h2>{schedule.name}</h2>

                  <span
                    className={
                      schedule.enabled
                        ? "schedule-status"
                        : "schedule-status schedule-status-disabled"
                    }
                  >
                    {schedule.enabled ? "Active" : "Disabled"}
                  </span>
                </div>

                <p className="schedule-message">
                  {schedule.message}
                </p>

                <div className="schedule-details">
                  <span>
                    <strong>Time:</strong>{" "}
                    {schedule.startTime} - {schedule.endTime}
                  </span>

                  <span>
                    <strong>Recipients:</strong>{" "}
                    {getRecipientNames(schedule.recipientIds) ||
                      "No recipients"}
                  </span>

                  <span>
                    <strong>Location:</strong>{" "}
                    {schedule.state
                      ? `${schedule.state}, ${schedule.country}`
                      : schedule.country}
                  </span>

                  <span>
                    <strong>Holidays:</strong>{" "}
                    {schedule.skipHolidays
                      ? "Skip holidays"
                      : "Send on holidays"}
                  </span>
                </div>
              </div>

              <div className="schedule-card-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    dispatch(toggleSchedule(schedule.id))
                  }
                >
                  <Power size={16} />
                  {schedule.enabled ? "Disable" : "Enable"}
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() =>
                    dispatch(deleteSchedule(schedule.id))
                  }
                  aria-label={`Delete ${schedule.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SchedulesPage;