import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { APIResponseInterface } from "../models/common-models";
import { NotificationAPIResponse } from "../models/notification-models";
import { NotificationPreferenceSettingAPI, NotificationPreferenceSettingInterface } from "../models/preference.setting";

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

        getNotificationPreference: builder.query<NotificationPreferenceSettingAPI[], void>({
            query: () => ({
                url: `notification/preference/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.PREFERENCES]
        }),
        getDelegationOnlyNotification: builder.query<NotificationAPIResponse[], void>({
            query: () => ({
                url: `notification/delegationOnly/`,
                method: `GET`,
            }),
            providesTags: [API_TAGS.NOTIFICATION]
        }),
    
        setUpNotificationPreference: builder.mutation<APIResponseInterface, NotificationPreferenceSettingInterface>({
            query: (prefenceData) => ({
                url: `notification/setup_preference/`,
                method: `POST`,
                body: prefenceData
            }),
            invalidatesTags: [API_TAGS.PREFERENCES]

        }),

        markAsReadNotification: builder.mutation<void, string>({
            query: (notification_id) => ({
                url: `notification/update/${notification_id}/mark-as-read/`,
                method: `PATCH`,
            }),
            invalidatesTags: [API_TAGS.NOTIFICATION]
        })
    })
})


export const {
    useGetNotificationQuery, 
    useGetNotificationPreferenceQuery,
    useSetUpNotificationPreferenceMutation,
    useMarkAsReadNotificationMutation,
    useGetDelegationOnlyNotificationQuery,
} = notificationAPISlice