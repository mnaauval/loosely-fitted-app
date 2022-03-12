import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  isLoggedIn: false,
  isLoggedOut: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoggedOut = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
