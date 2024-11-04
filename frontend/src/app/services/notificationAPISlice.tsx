import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { NotificationAPIResponse } from "../models/notification-models";

// { page?: number; limit?: number }
const notificationAPISlice = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query<NotificationAPIResponse[], void>({
            query: () => ({
                url: `notification/show/`,
                method: `GET`,
                // params: {
                //     page: params.page || 1,
                //     limit: params.limit || 10,
                // },
            }),
            providesTags: [API_TAGS.NOTIFICATION]
        }),

        markAsReadNotification: builder.mutation<void, string>({
            query: (notification_id) => ({
                url: `notification/update/${notification_id}/mark-as-read/`,
                method: `PATCH`,
            })
        })
    })
})


export const {
    useGetNotificationQuery, 
    useMarkAsReadNotificationMutation
} = notificationAPISlice