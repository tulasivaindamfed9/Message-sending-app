import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addRecipient } from "../../features/recipients/recipientSlice";

function RecipientForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phoneNumber.trim()) {
      return;
    }

    dispatch(
      addRecipient({
        id: crypto.randomUUID(),
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
      </div>
    </form>
  );
}

export default RecipientForm;