import React from "react";
import { TabMenuInterface } from "../../models/notification-models";
import NotificationDashboard from "../../views/dashboard/dashboard-sub-components/NotificationDashbord";



export const notification_item: TabMenuInterface[] = [
    {
        label: "All",
        tabContent: <NotificationDashboard />
    },
    {
        label: "Unread",
        tabContent: <h1>Unread Notification</h1>
    }

]