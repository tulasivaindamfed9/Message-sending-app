import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { addSchedule } from "../../features/schedules/scheduleSlice";
import "./ScheduleForm.css";
import { useAppSelector } from "../../app/hooks";

function ScheduleForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const currentUser = useAppSelector(
  (state) => state.auth.currentUser,
);

  const recipients = useAppSelector((state) => 
  state.recipients.recipients.filter(
    (recipient) => recipient.userId === currentUser?.id,
  ),
);

const [recipientIds, setRecipientIds] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [startTime, setStartTime] = useState("05:00");
  const [endTime, setEndTime] = useState("05:30");

  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");

  const [skipHolidays, setSkipHolidays] = useState(true);

  const [excludedDates, setExcludedDates] = useState<string[]>([]);
  const [dateInput, setDateInput] = useState("");

  const addExcludedDate = () => {
    if (!dateInput || excludedDates.includes(dateInput)) {
      return;
    }

    setExcludedDates((currentDates) => [...currentDates, dateInput]);
    setDateInput("");
  };

  const removeExcludedDate = (date: string) => {
    setExcludedDates((currentDates) =>
      currentDates.filter((item) => item !== date),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (recipientIds.length === 0) {
    return;
  }
  
    const newSchedule = {
      id: crypto.randomUUID(),
      userId: currentUser!.id,
      name,
      message,
      startTime,
      endTime,
      recipientIds,
      country,
      state,
      skipHolidays,
      excludedDates,
      enabled: true,
    };

    dispatch(addSchedule(newSchedule));

    navigate("/schedules");
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Schedule Details</h2>

        <div className="form-group">
          <label htmlFor="schedule-name">Schedule name</label>

          <input
            id="schedule-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Morning Good Morning"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Good morning! Have a wonderful day."
            rows={5}
            required
          />

          <span className="form-help">
            This message will be sent to your selected WhatsApp recipients.
          </span>
        </div>
      </div>

      <div className="form-section">
        <h2>Send Time</h2>

        <p className="section-description">
          The system will select a random time between these two times.
        </p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start-time">Start time</label>

            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end-time">End time</label>

            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Add recipient selection UI */}
      <div className="form-section">
  <h2>Recipients</h2>

  <p className="section-description">
    Select the WhatsApp numbers that should receive this message.
  </p>

  {recipients.length === 0 ? (
    <div className="recipient-selection-empty">
      <p>No recipients available.</p>

      <button
        type="button"
        className="secondary-button"
        onClick={() => navigate("/recipients/create")}
      >
        Add Recipient
      </button>
    </div>
  ) : (
    <div className="recipient-selection-list">
      {recipients
        .filter((recipient) => recipient.enabled)
        .map((recipient) => (
          <label
            className="recipient-selection-item"
            key={recipient.id}
          >
            <input
              type="checkbox"
              checked={recipientIds.includes(recipient.id)}
              onChange={() => {
                setRecipientIds((current) =>
                  current.includes(recipient.id)
                    ? current.filter((id) => id !== recipient.id)
                    : [...current, recipient.id],
                );
              }}
            />

            <span>
              <strong>{recipient.name}</strong>
              <small>{recipient.phoneNumber}</small>
            </span>
          </label>
        ))}
    </div>
  )}
</div>

      <div className="form-section">
        <h2>Holiday Settings</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country</label>

            <select
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>

            <select
              id="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option value="">Select state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={skipHolidays}
            onChange={(event) => setSkipHolidays(event.target.checked)}
          />

          <span>Don't send messages on holidays</span>
        </label>
      </div>

      <div className="form-section">
        <h2>Excluded Dates</h2>

        <p className="section-description">
          Add specific dates when you don't want to send the message.
        </p>

        <div className="date-input-row">
          <input
            type="date"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
          />

          <button
            type="button"
            className="secondary-button"
            onClick={addExcludedDate}
          >
            Add Date
          </button>
        </div>

        {excludedDates.length > 0 && (
          <div className="date-list">
            {excludedDates.map((date) => (
              <div className="date-item" key={date}>
                <span>{date}</span>

                <button
                  type="button"
                  className="remove-date-button"
                  onClick={() => removeExcludedDate(date)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/schedules")}
        >
          Cancel
        </button>

        <button type="submit" className="primary-button">
          Create Schedule
        </button>
      </div>
    </form>
  );
}

export default ScheduleForm;