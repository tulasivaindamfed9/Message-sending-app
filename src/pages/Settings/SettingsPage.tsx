import { useState } from "react";
import { Save } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updateCountry,
  updateEndTime,
  updateSkipHolidays,
  updateStartTime,
  updateState,
  updateTheme,
  updateTimezone,
} from "../../features/settings/settingsSlice";

import "./SettingsPage.css";

function SettingsPage() {
  const dispatch = useAppDispatch();

  const settings = useAppSelector(
    (state) => state.settings,
  );

  const [country, setCountry] = useState(settings.country);
  const [stateName, setStateName] = useState(settings.state);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [skipHolidays, setSkipHolidays] = useState(
    settings.skipHolidays,
  );
  const [theme, setTheme] = useState(settings.theme);

  const handleSave = () => {
    dispatch(updateCountry(country));
    dispatch(updateState(stateName));
    dispatch(updateTimezone(timezone));
    dispatch(updateStartTime(startTime));
    dispatch(updateEndTime(endTime));
    dispatch(updateSkipHolidays(skipHolidays));
    dispatch(updateTheme(theme));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your default scheduling and application
            preferences.
          </p>
        </div>
      </div>

      <div className="settings-list">
        <section className="settings-card settings-card-column">
          <div className="settings-content">
            <h2>Location</h2>

            <p>
              Used to determine which holidays should be skipped.
            </p>
          </div>

          <div className="settings-fields">
            <div className="form-group">
              <label htmlFor="settings-country">
                Country
              </label>

              <select
                id="settings-country"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
              >
                <option value="India">India</option>
                <option value="United States">
                  United States
                </option>
                <option value="United Kingdom">
                  United Kingdom
                </option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="settings-state">
                State / Region
              </label>

              <input
                id="settings-state"
                type="text"
                value={stateName}
                onChange={(event) =>
                  setStateName(event.target.value)
                }
                placeholder="Example: Andhra Pradesh"
              />
            </div>
          </div>
        </section>

        <section className="settings-card settings-card-column">
          <div className="settings-content">
            <h2>Timezone</h2>

            <p>
              The scheduler will use this timezone when
              calculating the sending time.
            </p>
          </div>

          <div className="settings-fields">
            <div className="form-group">
              <label htmlFor="settings-timezone">
                Timezone
              </label>

              <select
                id="settings-timezone"
                value={timezone}
                onChange={(event) =>
                  setTimezone(event.target.value)
                }
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata (IST)
                </option>

                <option value="America/New_York">
                  America/New_York
                </option>

                <option value="America/Los_Angeles">
                  America/Los_Angeles
                </option>

                <option value="Europe/London">
                  Europe/London
                </option>

                <option value="Australia/Sydney">
                  Australia/Sydney
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="settings-card settings-card-column">
          <div className="settings-content">
            <h2>Default Sending Window</h2>

            <p>
              New schedules will use this time window by
              default.
            </p>
          </div>

          <div className="settings-fields settings-time-row">
            <div className="form-group">
              <label htmlFor="settings-start-time">
                Start time
              </label>

              <input
                id="settings-start-time"
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="settings-end-time">
                End time
              </label>

              <input
                id="settings-end-time"
                type="time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(event.target.value)
                }
              />
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-content">
            <h2>Holiday Handling</h2>

            <p>
              Skip sending messages on configured holidays by
              default.
            </p>
          </div>

          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={skipHolidays}
              onChange={(event) =>
                setSkipHolidays(event.target.checked)
              }
            />

            <span>
              {skipHolidays ? "Enabled" : "Disabled"}
            </span>
          </label>
        </section>

        <section className="settings-card">
          <div className="settings-content">
            <h2>Theme</h2>

            <p>
              Choose the appearance of the application.
            </p>
          </div>

          <select
            className="settings-select"
            value={theme}
            onChange={(event) =>
              setTheme(
                event.target.value as "light" | "dark",
              )
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </section>

        <div className="settings-save">
          <button
            type="button"
            className="primary-button"
            onClick={handleSave}
          >
            <Save size={17} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;