import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  country: string;
  state: string;
  timezone: string;
  startTime: string;
  endTime: string;
  skipHolidays: boolean;
  theme: "light" | "dark";
}

const initialState: SettingsState = {
  country: "India",
  state: "Andhra Pradesh",
  timezone: "Asia/Kolkata",
  startTime: "05:00",
  endTime: "05:30",
  skipHolidays: true,
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },

    updateState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },

    updateTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },

    updateStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },

    updateEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },

    updateSkipHolidays: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.skipHolidays = action.payload;
    },

    updateTheme: (
      state,
      action: PayloadAction<"light" | "dark">,
    ) => {
      state.theme = action.payload;
    },
  },
});

export const {
  updateCountry,
  updateState,
  updateTimezone,
  updateStartTime,
  updateEndTime,
  updateSkipHolidays,
  updateTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;