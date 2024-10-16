import { erpAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { PolicyActionAPInterface, PolicyActionInterface, PolicyAPIInterface } from "../models/policy.model";


const policiesAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPolicies: builder.query<PolicyAPIInterface[], void>({
            query: () => ({
                url: `/iam/policy/get_policy/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllAction: builder.query<PolicyActionInterface[], void>({
            query: () => ({
                url: `/iam/policy/actions/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllGetViewList: builder.query<PolicyActionInterface[], void>({
            query: () => ({
                url: `/iam/policy/list/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllAddViewList: builder.query<PolicyActionInterface[], void>({
            query: () => ({
                url: `/iam/policy/add/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllRemoveViewList: builder.query<PolicyActionInterface[], void>({
            query: () => ({
                url: `/iam/policy/remove/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllChangeViewList: builder.query<PolicyActionInterface[], void>({
            query: () => ({
                url: `/iam/policy/change/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),

    })
})



export const {
    useGetAllPoliciesQuery,
    useGetAllActionQuery,
    useGetAllGetViewListQuery,
    useGetAllAddViewListQuery,
    useGetAllChangeViewListQuery,
    useGetAllRemoveViewListQuery,
} = policiesAPI
