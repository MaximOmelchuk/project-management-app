import { Dispatch, SetStateAction } from "react";

export interface ISigninArg {
  login: string;
  password: string;
}

export interface ISigninResult {
  url: string;
  method: string;
  body: ISigninArg;
}

export interface ICreateBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface ICreateColumn {
  id: string;
  body: {
    title: string;
    order: number;
  };
}

export interface ICreateBoardResult {
  _id: string;
  title: string;
  order: string;
  boardId: string;
}

export interface ICreateColumnResult {
  _id: string;
  title: string;
  order: string;
  boardId: string;
}

export interface IUpdateBoard {
  id: string;
  body: ICreateBoard;
}

export interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export interface IDeleteTask extends IDeleteColumn {
  taskId: string;
}

export interface ICreateTask extends IDeleteColumn {
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    users: string[];
  };
}

export interface ITaskProps {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface IUpdateTask extends IDeleteTask {
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    users: string[];
  };
}

export interface IUpdateColumn extends IDeleteColumn {
  body: {
    title: string;
    order: number;
  };
}

export interface IBoardData extends ICreateBoard {
  _id: string;
}

export interface IBoardProps extends IBoardData {
  key: string;
}

export interface IInputModalProps {
  confirmHandler: (arg: { first: string; second?: string }) => void;
  closeHandler: () => void;
  title: string;
  inputsContent: string[];
}

export interface IGetUserData {
  _id: "string";
  name: "string";
  login: "string";
}

export interface IEditTaskModalProps {
  closeHandler: () => void;
  title: string;
  description: string;
  userId: string;
  users: string[];
  columnId: string;
  order: number;
  boardId: string;
  taskId: string;
}

export interface IColumnProps {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  setArrColumnState: Dispatch<SetStateAction<IColumnProps[]>>;
}
