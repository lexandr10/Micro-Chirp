export interface IAuthForm {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
}
export interface IAuthResponseRegister {
  accessToken: string;
  id: number;
  user: IUser;
}

export interface IAuthResponseLogin {
    accessToken: string
}