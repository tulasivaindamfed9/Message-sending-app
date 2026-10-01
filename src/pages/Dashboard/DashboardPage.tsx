import { useNavigate } from "react-router-dom";
import {
  CalendarClock,
  MessageCircle,
  Plus,
  Users,
} from "lucide-react";

import { useAppSelector } from "../../app/hooks";

import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  const schedules = useAppSelector(
    (state) => state.schedules.schedules,
  );

  const recipients = useAppSelector(
    (state) => state.recipients.recipients,
  );

  const activeSchedules = schedules.filter(
    (schedule) => schedule.enabled,
  );

  const activeRecipients = recipients.filter(
    (recipient) => recipient.enabled,
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Good Morning 👋</h1>
          <p>
            Manage your daily WhatsApp messages from one place.
          </p>
        </div>

        <button
          type="button"
          className="primary-button dashboard-create-button"
          onClick={() => navigate("/schedules/create")}
        >
          <Plus size={17} />
          Create Schedule
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <CalendarClock size={20} />
          </div>

          <span className="card-label">
            Active Schedules
          </span>

          <strong className="dashboard-card-value">
            {activeSchedules.length}
          </strong>

          <span className="dashboard-card-description">
            {schedules.length === 1
              ? "1 schedule created"
              : `${schedules.length} schedules created`}
          </span>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <Users size={20} />
          </div>

          <span className="card-label">
            Active Recipients
          </span>

          <strong className="dashboard-card-value">
            {activeRecipients.length}
          </strong>

          <span className="dashboard-card-description">
            {recipients.length === 1
              ? "1 recipient added"
              : `${recipients.length} recipients added`}
          </span>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <MessageCircle size={20} />
          </div>

          <span className="card-label">
            Sending Window
          </span>

          <strong className="dashboard-card-value">
            05:00 - 05:30
          </strong>

          <span className="dashboard-card-description">
            Random time within the window
          </span>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h2>Active Schedules</h2>
              <p>
                Your currently enabled Good Morning schedules.
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/schedules")}
            >
              View All
            </button>
          </div>

          {activeSchedules.length === 0 ? (
            <div className="dashboard-empty">
              <p>No active schedules yet.</p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/schedules/create")}
              >
                Create your first schedule
              </button>
            </div>
          ) : (
            <div className="dashboard-schedule-list">
              {activeSchedules.slice(0, 3).map((schedule) => (
                <div
                  className="dashboard-schedule-item"
                  key={schedule.id}
                >
                  <div>
                    <strong>{schedule.name}</strong>

                    <span>
                      {schedule.startTime} -{" "}
                      {schedule.endTime}
                    </span>
                  </div>

                  <span className="schedule-status">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h2>Recipients</h2>
              <p>
                People who can receive your scheduled messages.
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/recipients")}
            >
              Manage
            </button>
          </div>

          {activeRecipients.length === 0 ? (
            <div className="dashboard-empty">
              <p>No active recipients yet.</p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/recipients/create")}
              >
                Add recipient
              </button>
            </div>
          ) : (
            <div className="dashboard-recipient-list">
              {activeRecipients.slice(0, 4).map((recipient) => (
                <div
                  className="dashboard-recipient-item"
                  key={recipient.id}
                >
                  <div className="recipient-avatar">
                    {recipient.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{recipient.name}</strong>
                    <span>{recipient.phoneNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;