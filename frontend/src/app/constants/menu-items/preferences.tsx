import { IoIosNotifications } from "react-icons/io";
import { NotificationPreferenceSetUp } from "../../views/preferences/preferences-mini-component";

export const preferences_tab_menu = [
    {
        label: "Notification Preferences",
        total: true,
        icon: <IoIosNotifications />,
        tabContent: <NotificationPreferenceSetUp />
    },
    {
        label: "Notification",
        total: true,
        icon: <IoIosNotifications />,
        tabContent: <h1>Notification</h1>
    },
    {
        label: "Preferences",
        total: true,
        icon: <IoIosNotifications />,
        tabContent: <h1>Preferences</h1>
    }
]