import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";

interface NotificationInterface {
    notification_recepient?: string; 
    notification_message: string;
    notification_read: boolean;
    notification_recieved_at?: string; 
    notification_metadata: Record<string, any>;
    workflow_state?: string;
    action_taken?: string;
    request?: string
}

interface NotificationsResponse {
    notifications: NotificationInterface[];
    total_unread: number;
    user: {
      username: string;
      email: string;
    };
  }


const notificationAPISlice = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query<NotificationsResponse, void>({
            query: () => ({
                url: `notification/show/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.NOTIFICATION]
        })
    })
})


export const {
    useGetNotificationQuery
} = notificationAPISlice