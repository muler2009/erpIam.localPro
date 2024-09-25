import { erpAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { UserAPIResponse, UserAccountInterfacee } from "../models/user.model"; 

const userAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserAccountInterfacee[], void>({
            query: () => ({
                url: `iam/account/get_account/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.USER]
        }),
        createUserAccount: builder.mutation<UserAPIResponse, UserAccountInterfacee>({
            query: (userData) => ({
                url: `iam/account/create_account/`,
                method: `POST`,
                body: userData
            }),
            invalidatesTags: [API_TAGS.USER]
        }),
        userSelfRegistration: builder.mutation<UserAPIResponse, UserAccountInterfacee>({
            query: (registration_data) => ({
                url: `iam/account/register_user/`,
                method: `POST`,
                body: registration_data
            })
        })
    })
})

export const { 
    useGetAllUsersQuery,
    useUserSelfRegistrationMutation,
    useCreateUserAccountMutation
} = userAPI


