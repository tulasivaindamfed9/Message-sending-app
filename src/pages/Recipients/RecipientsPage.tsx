import { useNavigate } from "react-router-dom";
import { Trash2, Power } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteRecipient,
  toggleRecipient,
} from "../../features/recipients/recipientSlice";

import "./RecipientsPage.css";

function RecipientsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const recipients = useAppSelector(
    (state) => state.recipients.recipients,
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Recipients</h1>
          <p>Manage the WhatsApp numbers that receive your messages.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/recipients/create")}
        >
          Add Recipient
        </button>
      </div>

      {recipients.length === 0 ? (
        <div className="empty-state">
          <h2>No recipients yet</h2>
          <p>Add a WhatsApp number to use it in your schedules.</p>
        </div>
      ) : (
        <div className="recipients-list">
          {recipients.map((recipient) => (
            <div className="recipient-card" key={recipient.id}>
              <div className="recipient-info">
                <span className="recipient-name">{recipient.name}</span>

                <span className="recipient-number">
                  {recipient.phoneNumber}
                </span>

                <span
                  className={
                    recipient.enabled
                      ? "recipient-enabled"
                      : "recipient-disabled"
                  }
                >
                  {recipient.enabled ? "Active" : "Disabled"}
                </span>
              </div>

              <div className="recipient-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => dispatch(toggleRecipient(recipient.id))}
                >
                  <Power size={16} />
                  {recipient.enabled ? "Disable" : "Enable"}
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => dispatch(deleteRecipient(recipient.id))}
                  aria-label={`Delete ${recipient.name}`}
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

export default RecipientsPage;