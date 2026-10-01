import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export type HistoryStatus =
  | "sent"
  | "failed"
  | "skipped";

export type HistorySkipReason =
  | "holiday"
  | "excluded-date"
  | null;

export interface HistoryItem {
  id: string;
  scheduleId: string;
  scheduleName: string;
  recipientId: string;
  recipientName: string;
  phoneNumber: string;
  message: string;
  status: HistoryStatus;
  skipReason: HistorySkipReason;
  scheduledDate: string;
  sentAt: string | null;
}

interface HistoryState {
  items: HistoryItem[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryItem: (
      state,
      action: PayloadAction<HistoryItem>,
    ) => {
      state.items.unshift(action.payload);
    },

    clearHistory: (state) => {
      state.items = [];
    },
  },
});

export const {
  addHistoryItem,
  clearHistory,
} = historySlice.actions;

export default historySlice.reducer;