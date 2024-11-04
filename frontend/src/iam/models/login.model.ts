export interface LoginFailedModalInterface {
    loginErrorMessage: string;
    loginFailed: boolean;
    setLoginFailed: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AuthResponse {
    access: string;
    refresh: string;
    status_code: number;
    username: string;
    group: string;
    is_active: boolean;
    full_name: string;
}

export interface LoginRequiredData {
    username: string;
    password: string;
}