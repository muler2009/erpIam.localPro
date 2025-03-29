import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../api/apiSlice";
import { LoginEventAuditLogAPIInterface } from "../models/sys_audit_interface";


const auditLogsAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoginAuditLogs: builder.query<LoginEventAuditLogAPIInterface[], void>({
            query: () => ({
                url: `iam/account/audit_login_event/`,
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
    useGetLoginChartStasticsQuery
} = auditLogsAPI