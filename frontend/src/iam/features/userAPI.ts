import { erpAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { UserAPIResponse, UserAccountInterfacee, UserActivationDeactivationAPIresponse } from "../models/user.model"; 

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
            }),
            invalidatesTags: [API_TAGS.USER]
        }),
        searchUsers: builder.query<UserAccountInterfacee[],{first_name?: string; last_name?: string}>({
            query: ({first_name, last_name}) => {
                let url = `iam/account/search_user/?`;
                // Append parameters if provided
                if (first_name) { url += `search=${first_name}&`; }
                if (last_name) { url += `search=${last_name}`; }

                return {
                     url: url,
                     method: `GET`
                 }
             },
             providesTags: [API_TAGS.USER]
        }),
        toggelActivationAndDeactivation: builder.mutation<UserActivationDeactivationAPIresponse, string>({
            query: (user_account_id) => ({
                url: `iam/account/deactivate/${user_account_id}/`,
                method: `POST`
            }),
            invalidatesTags: [API_TAGS.USER]
        })
    })
})

export const { 
    useGetAllUsersQuery,
    useUserSelfRegistrationMutation,
    useCreateUserAccountMutation,
    useSearchUsersQuery,
    useToggelActivationAndDeactivationMutation
} = userAPI


