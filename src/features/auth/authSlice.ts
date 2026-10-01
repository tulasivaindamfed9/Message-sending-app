import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

/*
  Information about a registered user.

  For the current frontend-only version, this data is stored
  in localStorage.

  Later, the backend will store users securely in PostgreSQL.
*/
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

/*
  Authentication state.

  users:
    Stores registered users for the current frontend demo.

  currentUser:
    The user who is currently logged in.

  isAuthenticated:
    Tells the application whether someone is logged in.
*/
interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /*
      Add a newly registered user.

      Registration itself will be handled by the Register page.
      This action only updates Redux.
    */
    registerUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    /*
      Store the user who successfully logged in.
    */
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },

    /*
      Remove the current login session.

      We keep the registered user in the users array so that
      they can log in again later.
    */
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;