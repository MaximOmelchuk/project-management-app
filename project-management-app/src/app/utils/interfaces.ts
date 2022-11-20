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

export interface IUpdateBoard {
  id: string;
  body: ICreateBoard;
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

export interface IColumnProps {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
