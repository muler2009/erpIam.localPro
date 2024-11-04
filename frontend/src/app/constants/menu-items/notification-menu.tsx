import React from "react";
import { TabMenuInterface } from "../../models/notification-models";
import NotificationDashboard from "../../views/notification/notification-sub-component/Notification";
import NotifcationRecievedComponent from "../../views/notification/notification-sub-component/NotifcationRecievedComponent";

export const notification_item: TabMenuInterface[] = [
    {
        label: "All notification",
        tabContent: <NotifcationRecievedComponent />
    },
    {
        label: "Unread",
        tabContent: <h1>Unread Notification</h1>
    },
    {
        label: "Archived",
        tabContent: <h1>Archived Notification</h1>
    },
    {
        label: "Important",
        tabContent: <h1>Important Notification</h1>
    }

]