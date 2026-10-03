import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addRecipient } from "../../features/recipients/recipientSlice";

function RecipientForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(
  (state) => state.auth.currentUser,
);

const recipients = useAppSelector(
  (state) => state.recipients.recipients,
);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phoneNumber.trim()) {
      return;
    }

    // check for duplicate recipient based on name and phone number for the current user.
    // if recipent exists, show error message and do not add the recipient.
const normalizedName = name.trim().toLowerCase();
const normalizedPhone = phoneNumber.trim();

const duplicateRecipient = recipients.some(
  (recipient) =>
    recipient.userId === currentUser?.id &&
    recipient.name.trim().toLowerCase() === normalizedName ||
    recipient.phoneNumber.trim() === normalizedPhone,
);

if (duplicateRecipient) {
  setError("This recipient already exists.");
  return;
}

    dispatch(
      addRecipient({
        id: crypto.randomUUID(),
        userId: currentUser!.id , 
         //sending the current user id so wwe can display
        //  only the recipents who are associated with the current user
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        enabled: true,
      }),
    );

    navigate("/recipients");
  };

  return (
    <form className="recipient-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="recipient-name">Recipient name</label>

        <input
          id="recipient-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Example: Mom"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone-number">WhatsApp phone number</label>

        <input
          id="phone-number"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Example: +919876543210"
          required
        />

        <span className="form-help">
          Include the country code with the phone number.
        </span>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/recipients")}
        >
          Cancel
        </button>

        <button type="submit" className="primary-button">
          Add Recipient
        </button>
        {/* show error message in red color */}
        {error && <p className="form-error" style={{ color: "red" }}>
          {error}
        </p>}
      </div>
    </form>
  );
}

export default RecipientForm;