import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenu: true,
  localIps: [],
  publicIps: [],
  token: null,
  userInfo: null,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setFields: (state, action) => {
      return { ...state, ...action.payload };
    },
    setInitialState: () => ({ ...initialState }),
    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    setUserInfo: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
  },
});

export const { setFields, setInitialState, setToken, setUserInfo } =
  common.actions;
export default common.reducer;
