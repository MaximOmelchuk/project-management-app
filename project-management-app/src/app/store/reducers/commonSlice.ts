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


export type GlobalContextContent = {
  isModalConfirmOpen: boolean;
  modalConfirmContent: string;
  modalConfirmHandler: () => void;
  formSignIn: FormContext | null;
  formSignUp: FormContext | null;
  formEditUser: FormContext | null;
  alert: ResponseAlert | null;
  searchString: string;
};

const initialState: GlobalContextContent = {
  isModalConfirmOpen: false,
  modalConfirmContent: "",
  modalConfirmHandler: () => {},
  formSignIn: null,
  formSignUp: null,
  formEditUser: null,
  alert: null,
  searchString: localStorage.getItem('search') || '',
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
    setFormSignIn: (state, action: PayloadAction<FormContext | null>) => {
      state.formSignIn = action.payload;
    },
    setFormSignUp: (state, action: PayloadAction<FormContext | null>) => {
      state.formSignUp = action.payload;
    },
    setFormEditUser: (state, action: PayloadAction<FormContext | null>) => {
      state.formEditUser = action.payload;
    },
    setMessageResponsive: (state, action: PayloadAction<ResponseAlert>) => {
      state.alert = action.payload;
    },
    changeSearchString: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchString: action.payload,
      };
    },
  },
});

export const {
  setIsModalConfirmOpen,
  setModalConfirmContent,
  setModalConfirmHandler,
  setFormSignIn,
  setFormSignUp,
  setFormEditUser,
  setMessageResponsive,
  changeSearchString,
} = appCommon.actions;

export const selectStateApp = (state: RootState) => state.common;

export default appCommon.reducer;

