import { erpAPISlice } from "../../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { LoginRequiredData, AuthResponse } from "../../iam/models/login.model";

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
        }) 
    })
})


export const {
    useGetLoggedUserQuery,
    useUserLoginMutation
} = loginAPI