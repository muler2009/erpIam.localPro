import { ReactElement } from "react";
import { erpAPISlice } from "../../api/apiSlice";

interface LogoutArgs {
    refresh: unknown;
}

const logoutAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogout: builder.mutation<any, LogoutArgs>({
            query: (logoutData) => ({
                url: `account/logout/`,
                method: "POST",
                body: logoutData
            })
        }) 
    })
})

export const {
    useUserLogoutMutation
} = logoutAPI