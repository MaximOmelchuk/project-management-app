import { IError, ITaskProps } from "./interfaces";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { setMessageResponsive } from "../store/reducers/commonSlice";

export function parseBoardTitle(title: string) {
  let res: string[];
  try {
    res = JSON.parse(title);
  } catch (e) {
    res = ["", ""];
  }
  return res;
}

export function replaceOrderWithIndexInArray(arr: ITaskProps[]) {
  return arr.map((task, index) => ({
    ...task,
    order: index,
  }));
}

export function reduceTaskData(arr: ITaskProps[], destColumnId?: string) {
  return arr.map(({ _id, columnId, order }) => ({
    order,
    _id,
    columnId: destColumnId || columnId,
  }));
}

export function redirect(err: unknown, dispatch: ThunkDispatch<any, any, AnyAction>) {
  window.location.href = '/';
}

export const getErrorMessage = (err: unknown, dispatch: ThunkDispatch<any, any, AnyAction>) => {

  const { error } = err as IError;
  const { data: { message, statusCode } } = error;
  switch (statusCode) {
    case 401:
      dispatch(setMessageResponsive({ mainMessage: 'actionMessage.userMistake', type: 'error' }));
      break
    case 403:
      dispatch(setMessageResponsive({ mainMessage: 'actionMessage.unauthorized', type: 'error' }));
      redirect(err, dispatch)
      break
    case 409:
      dispatch(setMessageResponsive({ mainMessage: 'actionMessage.alreadyExist', type: 'error' }));
      break
    default:
      dispatch(setMessageResponsive({ mainMessage: message, type: 'error' }))
      break
  }
}

export const objectFromString = (string: string) => {
  return JSON.parse(string);
};
