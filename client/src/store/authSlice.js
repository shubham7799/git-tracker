// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userInfo: null,
    repos: [],
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setRepos(state, action) {
      state.repos = action.payload;
    },
    clearAll(state) {
      state.accessToken = null;
      state.userInfo = null;
      state.repos = [];
    },
  },
});

export const { setAccessToken, setUserInfo, setRepos, clearAll } =
  authSlice.actions;

export default authSlice.reducer;
