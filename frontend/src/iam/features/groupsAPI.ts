import { erpAPISlice } from "../../api/apiSlice"
import { API_TAGS } from "../../config/config"
import { GroupInterface, GroupAPIResponse, SubGroupInterface } from "../models/group.model"

export const groupsAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.query<GroupInterface[], void>({
            query: () => ({
                url: `groups/get/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.GROUPS_TAG]
        }),
        // getSubGroups: builder.query<SubGroupInterface[], void>({
        //     query: () => ({
        //         url: `account/get_subgroup/`,
        //         method: 'GET'
        //     }),
        //     providesTags: [API_TAGS.SUB_GROUPS_TAG]
        // }),
        createGroups: builder.mutation<GroupAPIResponse, GroupInterface>({
            query: (data) => ({
                url: `account/create_group/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [API_TAGS.GROUPS_TAG]
            
        })
    })
})


export const {
    useCreateGroupsMutation,
    useGetGroupsQuery,
    // useGetSubGroupsQuery
} = groupsAPI