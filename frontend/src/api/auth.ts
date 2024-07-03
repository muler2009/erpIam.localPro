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
    role: localStorage.getItem('role') || null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            const {access, refresh, role } = action.payload
            state.token = access;
            state.refresh = refresh;
            state.isAuthenticated = true;
            localStorage.setItem("token", access)
            localStorage.setItem("refresh", refresh)
            localStorage.setItem("isAuthenticated", JSON.stringify(true))      
        },
        clearAuthData: (state, action) => {
            state.isAuthenticated = false
            state.token = null
            state.refresh = null
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            localStorage.removeItem("isAuthenticated")
        }
       
        
    },
    extraReducers: (builder) => {  }
})

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const access = (state: RootState) => state.auth.token
export const refresh = (state: RootState) => state.auth.refresh
export const csrfToken = (state: RootState) => state.auth.csrftoken
export const userRole = (state: RootState) => state.auth.role


export const { setAuthData, clearAuthData } = authSlice.actions

export default authSlice.reducer