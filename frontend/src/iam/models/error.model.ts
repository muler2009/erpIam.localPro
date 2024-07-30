export interface ErrorResponseInterface {
  error_type: string;
  message: string;
  status_code: number;
}

export interface LoginFailedModalInterface {
  loginErrorMessage: ErrorResponseInterface | null;
  loginFailed: boolean;
  setLoginFailed: React.Dispatch<React.SetStateAction<boolean>>
}
