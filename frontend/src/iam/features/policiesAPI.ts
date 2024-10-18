import { erpAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { PolicyActionAPInterface, PolicyAPIinterface, PolicyActionInterface, PolicyAPIInterface, PolicyDataInterface, ProjectModelAPIinterface } from "../models/policy.model";


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
        getAllGetViewList: builder.query<PolicyDataInterface[], void>({
            query: () => ({
                url: `/iam/policy/list/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllAddViewList: builder.query<PolicyDataInterface[], void>({
            query: () => ({
                url: `/iam/policy/add/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllRemoveViewList: builder.query<PolicyDataInterface[], void>({
            query: () => ({
                url: `/iam/policy/remove/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllChangeViewList: builder.query<PolicyDataInterface[], void>({
            query: () => ({
                url: `/iam/policy/change/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        getAllCustomManagedPolices: builder.query<PolicyAPIinterface[], void>({
            query: () => ({
                url: `/iam/policy/get_custom_policy/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY] 
        }),
        createNewPolicy: builder.mutation<PolicyAPIinterface, PolicyDataInterface>({
            query: (policyData) => ({
                url: `/iam/policy/add_new_policy/`,
                method: `POST`,
                body: policyData
            }),
           invalidatesTags: [API_TAGS.POLICY]
        }),
        // endpoint for retreiving all the model
        getAllOrganizationModel: builder.query<ProjectModelAPIinterface[], void>({
            query: () => ({
                url: `/iam/policy/project_model/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.POLICY]

        })
        
        

    })
})



export const {
    useGetAllPoliciesQuery,
    useGetAllActionQuery,
    useGetAllGetViewListQuery,
    useGetAllAddViewListQuery,
    useGetAllChangeViewListQuery,
    useGetAllRemoveViewListQuery,
    useCreateNewPolicyMutation,
    useGetAllCustomManagedPolicesQuery,
    useGetAllOrganizationModelQuery,
} = policiesAPI
