import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";
import { RootState } from "../store";

export type FormContext = {
  name?: string;
  login: string;
  password?: string;
};

export type ResponseAlert = {
  message: string,
  type: "error" | "warning" | "info" | "success",
}
/* 

export type GlobalContextContent = {
  isModalConfirmOpen: boolean;
  modalConfirmContent: string;
  modalConfirmHandler: () => void;
  formSignIn: FormSignInContext | null;
  formSignUp: string;
  formEditUser: string;
}; */

const initialState = {
  isModalConfirmOpen: false,
  modalConfirmContent: "",
  modalConfirmHandler: () => {},
  formSignIn: {},
  formSignUp: {} as FormContext,
  formEditUser: {} as FormContext,
  alert: {} as ResponseAlert,
};

const appCommon = createSlice({
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
    setFormSignIn: (state, action: PayloadAction<FormContext>) => {
      state.formSignIn = action.payload;
    },
    setFormSignUp: (state, action: PayloadAction<FormContext>) => {
      state.formSignUp = action.payload;
    },
    setFormEditUser: (state, action: PayloadAction<FormContext>) => {
      state.formEditUser = action.payload;
    },
    setMessageResponsive: (state, action: PayloadAction<ResponseAlert>) => {
      state.alert = action.payload;
    }
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
  setFormSignIn,
  setFormSignUp,
  setFormEditUser,
  setMessageResponsive
} = appCommon.actions;

export const selectStateApp = (state: RootState) => state.common;

export default appCommon.reducer;
