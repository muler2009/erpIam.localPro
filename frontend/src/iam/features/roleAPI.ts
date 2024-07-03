import { erpAPISlice } from "../../api/apiSlice";
import { RoleInterface } from "../models/role.models";
import { API_TAGS } from "../../config/config";

 interface BackendCreateRolesResponse {
    status: number;
    statusText: string;
    data: {
      // Include the fields from GetRoleSerializer here
      // Example:
      id: number;
      roleName: string;
      // Add other fields as needed
    };
  }


export const roleAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<RoleInterface[], void>({
            query: () => ({
                url: `account/get_role/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.ROLE_TAG]
        }),
        createRoles: builder.mutation<BackendCreateRolesResponse, RoleInterface>({
            query: (roleData) => ({
                url: `account/create_role/`,
                method: 'POST',
                body: roleData,
            }),
            invalidatesTags: [API_TAGS.ROLE_TAG]
        })
    })
})


export const {
    useGetRolesQuery,
    useCreateRolesMutation,
} = roleAPI