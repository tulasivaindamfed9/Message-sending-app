


import { combineReducers, configureStore } from "@reduxjs/toolkit";

import scheduleReducer from "../features/schedules/scheduleSlice";
import recipientReducer from "../features/recipients/recipientSlice";
import historyReducer from "../features/history/historySlice";
import settingsReducer from "../features/settings/settingsSlice";
import authReducer from "../features/auth/authSlice";

/*
  combineReducers combines all feature reducers into one root reducer.

  Each key becomes a section of our Redux state:

  state.schedules
  state.recipients
  state.history
  state.settings
*/
const rootReducer = combineReducers({
  schedules: scheduleReducer,
  recipients: recipientReducer,
  history: historyReducer,
  settings: settingsReducer,
  auth: authReducer,
});

/*
  RootState represents the complete Redux state of our application.

  Using ReturnType means TypeScript automatically understands
  the structure of our Redux state from rootReducer.
*/
export type RootState = ReturnType<typeof rootReducer>;

/*
  This is the key used to store our Redux data in browser localStorage.

  localStorage stores data as key/value pairs.

  Example:

  "good-morning-scheduler-state" → our Redux state as JSON
*/
const STORAGE_KEY = "good-morning-scheduler-state";

/*
  Load previously saved Redux data from localStorage.

  This function runs when the application starts.

  If saved data exists:
    → convert JSON back into a JavaScript object
    → use it as the initial Redux state

  If there is no saved data or something goes wrong:
    → return undefined
    → Redux will use the normal initial state from each slice
*/
const loadState = (): Partial<RootState> | undefined => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    // No saved data means this may be the user's first visit.
    if (!savedState) {
      return undefined;
    }

    /*
      localStorage stores everything as a string.

      JSON.parse() converts the stored string back into
      a JavaScript object.
    */
    return JSON.parse(savedState) as Partial<RootState>;
  } catch {
    /*
      If the stored data is invalid or localStorage has an error,
      don't stop the application from working.

      Redux will simply start with the default state.
    */
    return undefined;
  }
};

/*
  Create the Redux store.

  reducer:
    Tells Redux which reducers manage each part of the state.

  preloadedState:
    Loads previously saved data from localStorage when the app starts.

  So the flow is:

  Browser starts
       ↓
  loadState()
       ↓
  localStorage
       ↓
  Redux store gets saved data
*/
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

/*
  AppDispatch represents the type of Redux dispatch function.

  We use this type in our custom useAppDispatch hook so
  TypeScript can understand which Redux actions can be dispatched.
*/
export type AppDispatch = typeof store.dispatch;

/*
  store.subscribe() runs whenever the Redux state changes.

  Whenever we:
    - add a recipient
    - delete a recipient
    - create a schedule
    - delete a schedule
    - change settings
    - add history

  Redux state changes.

  We then save the latest Redux state to localStorage.

  Flow:

  User changes something
        ↓
  Redux action
        ↓
  Redux state changes
        ↓
  store.subscribe()
        ↓
  JSON.stringify()
        ↓
  localStorage
*/
store.subscribe(() => {
  try {
    /*
      JSON.stringify() converts the Redux JavaScript object
      into a string because localStorage can only store strings.
    */
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState()),
    );
  } catch {
    /*
      If localStorage fails, we don't want the entire application
      to crash. Redux will continue working normally in memory.
    */
  }
});