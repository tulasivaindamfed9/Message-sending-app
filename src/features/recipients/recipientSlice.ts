import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface Recipient {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  enabled: boolean;
}

interface RecipientState {
  recipients: Recipient[];
}

const initialState: RecipientState = {
  recipients: [],
};

const recipientSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    addRecipient: (state, action: PayloadAction<Recipient>) => {
      state.recipients.push(action.payload);
    },

    deleteRecipient: (state, action: PayloadAction<string>) => {
      state.recipients = state.recipients.filter(
        (recipient) => recipient.id !== action.payload,
      );
    },

    toggleRecipient: (state, action: PayloadAction<string>) => {
      const recipient = state.recipients.find(
        (item) => item.id === action.payload,
      );

      if (recipient) {
        recipient.enabled = !recipient.enabled;
      }
    },
  },
});

export const {
  addRecipient,
  deleteRecipient,
  toggleRecipient,
} = recipientSlice.actions;

export default recipientSlice.reducer;