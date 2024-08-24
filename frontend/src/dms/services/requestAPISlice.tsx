import { API_TAGS, BASE_URL } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { StateAPIResponse, ProcessAPIResponse, RequestAPIResponse, RequestDataInterface, RequestColumnInterface, SendRequestApprovalInterface } from "../models/request-model";


const requestAPISlice = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getState: builder.query<StateAPIResponse[], void>({
            query: () => ({
                url: `work-flows/get/`,
                method: `GET`
            }),
            // providesTags: [API_TAGS]
        }),
        getProcesses: builder.query<ProcessAPIResponse[], void>({
            query: () => ({
                url: `work-flows/get_protocol/`,
                method: `GET`
            }),
            // providesTags: [API_TAGS]
        }),
        getUnApprovedRequest: builder.query<RequestColumnInterface[], void>({
            query: () => ({
                url: `work-flows/get_unapproved_request_of_sender/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.REQUESTS]
        }),
        sendApprovedRequestByOwner: builder.mutation<RequestAPIResponse, SendRequestApprovalInterface>({
            query: (approvedData) => ({
                url: `work-flows/approved_by_owner/`,
                method: `POST`,
                body: approvedData
            }),
            invalidatesTags: [API_TAGS.REQUESTS]
        }),
        getAllRequest: builder.query<RequestDataInterface[], void>({
            query: () => ({
                url: `work-flows/get_approved/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.REQUESTS]
        }),
        getApprovedRequest: builder.query<RequestDataInterface[], void>({
            query: () => ({
                url: `work-flows/approvals/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.REQUESTS]
        }),
        getRequestsRecivedForApproval: builder.query<RequestColumnInterface[],  { current_state?: string }>({
            query: ({ current_state }) => {
               let url = 'work-flows/request_recieved/';
                return {
                    url: url,
                    method: 'GET',
                    params: {current_state}
                }; 
            },
            providesTags: [API_TAGS.REQUESTS]
        }),
        
        createdUnapprovedRequest: builder.mutation<RequestAPIResponse, FormData>({
            query: (formData) => ({
                url: `work-flows/send_request/`,
                method: `POST`,
                body: formData, 
            }),
            invalidatesTags: [API_TAGS.REQUESTS]
        }),

        performTransitionRequest: builder.mutation<RequestAPIResponse, FormData>({
            query: (formData) => {
                // Extract the request_id from FormData for use in the URL
                const requestId = formData.get('request_id') as string;
        
                return {
                    url: `work-flows/send_request/${requestId}/transition/`,
                    method: 'POST',
                    body: formData,  // Ensure the FormData object is set as the body
                    headers: {
                        // Include headers if necessary; usually, 'Content-Type' is not set for FormData
                        // 'Content-Type': 'multipart/form-data',
                    },
                };
            },
                
            invalidatesTags: [API_TAGS.REQUESTS]
        }),

        deleteUnapprovedRequest: builder.mutation<void, string>({
            query: (request_id) => ({
                url: `work-flows/delete_unapproved_request/${request_id}`,
                method: `DELETE`,
            }),
            invalidatesTags:[API_TAGS.REQUESTS]
        })
    })
})

export const { 
    useGetAllRequestQuery,
    useGetUnApprovedRequestQuery,
    useGetStateQuery,
    useGetProcessesQuery,
    useGetApprovedRequestQuery,
    useGetRequestsRecivedForApprovalQuery,
    useSendApprovedRequestByOwnerMutation,
    useCreatedUnapprovedRequestMutation,
    usePerformTransitionRequestMutation,
    useDeleteUnapprovedRequestMutation,
    

} = requestAPISlice