import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../api/apiSlice";
import { GroupAPIResponse } from "../models/group.model";
import { AccessFailureLogsInterface, GroupedFailedAccessLog, LoginEventAuditLogAPIInterface, AccessFailureLogsAPIResponse, APIResponseInterface } from "../models/sys_audit_interface";


const auditLogsAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoginAuditLogs: builder.query<LoginEventAuditLogAPIInterface[], void>({
            query: () => ({
                url: `iam/account/audit_login_event/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        getAccessFailureLogs: builder.query<AccessFailureLogsAPIResponse, void>({
            query: () => ({
                url: `iam/failed-logs/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        getAccessSuccessLogs: builder.query<AccessFailureLogsAPIResponse, void>({
            query: () => ({
                url: `iam/successful-logs/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        getLoginChartStastics: builder.query<any, void>({
            query: () => ({
                url: `iam/account/audit_login_stastics/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }),

        getAccessBasedOnGroup: builder.query<GroupedFailedAccessLog[], void>({ 
            query: () => ({
                url: `iam/category-logs/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        
        getLockedAccount: builder.query<AccessFailureLogsAPIResponse, void>({ 
            query: () => ({
                url: `iam/locked-accounts/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        unLockAccaountManually: builder.mutation<APIResponseInterface, {username: string}>({
            query: ({username}) => ({
                url: `iam/unlocked-account/`,
                method: `POST`,
                body: {username: username}
            }),
            invalidatesTags: [API_TAGS.AUDIT]
        }),

    })
})

export const {
    useGetLoginAuditLogsQuery,
    useGetLoginChartStasticsQuery,
    useGetAccessSuccessLogsQuery,
    useGetAccessFailureLogsQuery,
    useGetAccessBasedOnGroupQuery,
    useGetLockedAccountQuery, 
    useUnLockAccaountManuallyMutation
} = auditLogsAPI