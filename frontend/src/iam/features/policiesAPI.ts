import { erpAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../../config/config";
import { PolicyAPIInterface } from "../models/policy.model";


const policiesAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPolicies: builder.query<PolicyAPIInterface[], void>({
            query: () => ({
                url: `/iam/policy/get_policy/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.POLICY]
        })
    })
})



export const {
    useGetAllPoliciesQuery
} = policiesAPI
