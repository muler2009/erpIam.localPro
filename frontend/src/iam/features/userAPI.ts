import { erpAPISlice } from "../../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { UserAccountInterfacee } from "../models/user.model"; 

const userAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserAccountInterfacee[], void>({
            query: () => ({
                url: `account/get_account/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.USER]
        })
    })
})

export const { 
    useGetAllUsersQuery
} = userAPI