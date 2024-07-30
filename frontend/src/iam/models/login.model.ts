export interface LoginFailedModalInterface {
    loginErrorMessage: string;
    loginFailed: boolean;
    setLoginFailed: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AuthResponse {
    access: string;
    refresh: string;
    status: string;
    username: string;
    group: string;
}

export interface LoginRequiredData {
    username: string;
    password: string;
}