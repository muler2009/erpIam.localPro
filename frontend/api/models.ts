export interface AuthState {
    user?: null;
    isAuthenticated: string | boolean;
    token: string | null;
    refresh: string | null;
    csrftoken: null;
    role?: string | null;
}