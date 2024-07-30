export interface AuthState {
    username?: null;
    isAuthenticated: string | boolean;
    token: string | null;
    refresh: string | null;
    csrftoken: null;
    group: string | null;
}

export interface GetUserGroupAPIinterface {
    groups: string | null;
}