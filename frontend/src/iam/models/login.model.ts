export interface AuthResponse {
    access: string;
    refresh: string;
    status: string;
}

export interface LoginRequiredData {
    username: string;
    password: string;
}