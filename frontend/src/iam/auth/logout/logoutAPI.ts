import { ReactElement } from "react";
import { erpAPISlice } from "../../api/apiSlice";

export interface LogoutArgs {
    refreshToken: string | null;   
}

const logoutAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogout: builder.mutation<any, LogoutArgs>({
            query: (logoutData) => ({
                url: `iam/account/logout/`,
                method: "POST",
                body: logoutData
            })
        }) 
    })
})

export const {
    useUserLogoutMutation
} = logoutAPI