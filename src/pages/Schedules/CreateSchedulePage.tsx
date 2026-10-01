import { useNavigate } from "react-router-dom";

import ScheduleForm from "./ScheduleForm";

function CreateSchedulePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Create Schedule</h1>
          <p>Set up your daily Good Morning WhatsApp message.</p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/schedules")}
        >
          Back to Schedules
        </button>
      </div>

      <ScheduleForm />
    </div>
  );
}

export default CreateSchedulePage;