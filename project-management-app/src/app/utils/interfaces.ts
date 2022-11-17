export interface ISigninArg {
  login: string;
  password: string;
}

export interface ISigninResult {
  url: string;
  method: string;
  body: ISigninArg;
}
