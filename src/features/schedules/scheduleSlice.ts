import  { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Schedule {
  id: string;
  userId: string;
  name: string;
  message: string;

  startTime: string;
  endTime: string;

  recipientIds: string[];

  country: string;
  state: string;

  skipHolidays: boolean;
  excludedDates: string[];

  enabled: boolean;
}

interface ScheduleState {
  schedules: Schedule[];
}

const initialState: ScheduleState = {
  schedules: [],
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules.push(action.payload);
    },

    deleteSchedule: (state, action: PayloadAction<string>) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== action.payload,
      );
    },

    toggleSchedule: (state, action: PayloadAction<string>) => {
      const schedule = state.schedules.find(
        (item) => item.id === action.payload,
      );

      if (schedule) {
        schedule.enabled = !schedule.enabled;
      }
    },
  },
});

export const {
  addSchedule,
  deleteSchedule,
  toggleSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;