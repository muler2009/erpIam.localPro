import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./models";

interface RootState {
    auth: AuthState
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    token: localStorage.getItem('token') || null,
    refresh: localStorage.getItem('refresh') || null,
    csrftoken: null,
    group: null,
    username: null,
    full_name: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            const {access, refresh, group, username, full_name } = action.payload
            state.token = access;
            state.refresh = refresh;
            state.isAuthenticated = true;
            state.username = username
            state.full_name = full_name;
            localStorage.setItem("token", access)
            localStorage.setItem("full_name", full_name)
            localStorage.setItem("refresh", refresh)
            localStorage.setItem("isAuthenticated", JSON.stringify(true))      
        },
        clearAuthData: (state, action) => {
            state.isAuthenticated = false
            state.token = null
            state.refresh = null
            state.username = null
            state.full_name = null
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            localStorage.removeItem("full_name")
            localStorage.removeItem("isAuthenticated")

        },
        setGroup: (state, { payload }) => {
            state.group = payload
        }
    },
    extraReducers: (builder) => {  }
})

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const access = (state: RootState) => state.auth.token
export const refresh = (state: RootState) => state.auth.refresh
export const csrfToken = (state: RootState) => state.auth.csrftoken
export const group = (state: RootState) => state.auth.group
export const username = (state: RootState) => state.auth.username
export const fullName = (state: RootState) => state.auth.full_name



export const { setAuthData, clearAuthData, setGroup } = authSlice.actions

export default authSlice.reducer