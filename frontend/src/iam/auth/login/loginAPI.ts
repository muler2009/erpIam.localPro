import { erpAPISlice } from "../../api/apiSlice";
import { GetUserGroupAPIinterface } from "../../api/models";
import { API_TAGS } from "../../../config/config";
import { LoginRequiredData, AuthResponse } from "../../models/login.model";

const loginAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoggedUser: builder.query<AuthResponse, void>({
            query: () => ({
                url: `iam/account/login/`,
                method: "GET",
            }),
            providesTags: [API_TAGS.USER]
        }),
        userLogin: builder.mutation<AuthResponse, LoginRequiredData>({
            query: (loginData) => ({
                url: `iam/account/login/`,
                method: "POST",
                body: loginData
            }),
            invalidatesTags: [API_TAGS.USER]
        }),
        getUserGroup: builder.query<GetUserGroupAPIinterface, void>({
            query: () => ({
                url: `iam/account/get_user_group/`,
                method: `GET`,
            }),
        }),
        lockedCoolOffTime: builder.query<{locked: boolean, remaining_time: number}, void>({
            query: () => ({
                url: `iam/account/locked_time/`,
                method: "GET",
            }),  
            providesTags: [API_TAGS.USER]
        }),

    })
})


export const {
    useGetLoggedUserQuery,
    useUserLoginMutation,
    useGetUserGroupQuery,
    useLockedCoolOffTimeQuery,
} = loginAPI