import { useNavigate } from "react-router-dom";
import RecipientForm from "./RecipientForm";
import "./RecipientsPage.css";

function CreateRecipientPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add Recipient</h1>
          <p>Add a WhatsApp number for your scheduled messages.</p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/recipients")}
        >
          Back to Recipients
        </button>
      </div>

      <RecipientForm />
    </div>
  );
}

export default CreateRecipientPage;