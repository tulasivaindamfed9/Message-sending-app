import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

// These types will be useful when we create our slices.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;