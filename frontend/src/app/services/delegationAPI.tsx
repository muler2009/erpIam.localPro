import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { APIResponseInterface } from "../models/common-models";
import { DelegationColumnInterface, DelegationDataInterface } from "../models/delegation-models";


export const delegationAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        // get all delelgation from api
        getAllDelegation: builder.query<DelegationColumnInterface[], void>({
            query: () => ({
                url: `delegation/get_delegation/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.DELEGATION]
        }),
        getExpiredDelegation: builder.query<DelegationColumnInterface[], void>({
            query: () => ({
                url: `delegation/expired/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.DELEGATION]
        }),
        postDelegation: builder.mutation<APIResponseInterface, DelegationDataInterface>({
            query: (delegationInformation) => ({
                url: `delegation/new_delegation/`,
                method: `POST`,
                body: delegationInformation
            }),
            invalidatesTags: [API_TAGS.DELEGATION]
        }),
        revokeDelegation: builder.mutation<APIResponseInterface, string>({
            query: (delegation_id) => ({
                url: `delegation/revoke/${delegation_id}/`,
                method: `POST`,
            }),
            invalidatesTags: [API_TAGS.DELEGATION]
        }),


    })


})

export const {
    useGetAllDelegationQuery,
    useGetExpiredDelegationQuery,
    usePostDelegationMutation,
    useRevokeDelegationMutation,
} = delegationAPI