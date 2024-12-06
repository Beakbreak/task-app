export interface ISignUp {
  readonly userName: string;
  readonly password: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
}

export interface IAuthInfo {
  readonly success: boolean;
  readonly response: string;
}

export interface ISignIn {
  readonly email: string;
  readonly password: string;
}
