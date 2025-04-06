import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../api/apiSlice";
import { AccessFailureLogsAPIInterface, LoginEventAuditLogAPIInterface } from "../models/sys_audit_interface";


const auditLogsAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoginAuditLogs: builder.query<LoginEventAuditLogAPIInterface[], void>({
            query: () => ({
                url: `iam/account/audit_login_event/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        getAccessFailureLogs: builder.query<AccessFailureLogsAPIInterface[], void>({
            query: () => ({
                url: `iam/failed-logs/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.AUDIT]
        }), 
        getAccessSuccessLogs: builder.query<AccessFailureLogsAPIInterface[], void>({
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
        

    })
})

export const {
    useGetLoginAuditLogsQuery,
    useGetLoginChartStasticsQuery,
    useGetAccessSuccessLogsQuery,
    useGetAccessFailureLogsQuery
} = auditLogsAPI