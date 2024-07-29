export interface AuthResponse {
    access: string;
    refresh: string;
    status: string;
    user: string;
    group: string;
}

export interface LoginRequiredData {
    username: string;
    password: string;
}