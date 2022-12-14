import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalConfirmOpen: false,
  modalConfirmContent: "",
  modalConfirmHandler: () => {},
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsModalConfirmOpen: (state, action) => {
      return action.payload
        ? { ...state, isModalConfirmOpen: action.payload }
        : {
            ...state,
            isModalConfirmOpen: action.payload,
            modalConfirmContent: "",
            modalConfirmHandler: () => {},
          };
    },
    setModalConfirmContent: (state, action) => {
      return { ...state, modalConfirmContent: action.payload };
    },
    setModalConfirmHandler: (state, action) => {
      return { ...state, modalConfirmHandler: action.payload };
    },
    // setInitialState: () => ({ ...initialState }),
    // setToken: (state, action) => {
    //   return { ...state, token: action.payload };
    // },
    // setUserInfo: (state, action) => {
    //   return { ...state, userInfo: action.payload };
    // },
  },
});

export const {
  setIsModalConfirmOpen,
  setModalConfirmContent,
  setModalConfirmHandler,
} = common.actions;
export default common.reducer;
