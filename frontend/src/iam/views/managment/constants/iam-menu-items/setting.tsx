import { GetAllNotificationTemplate } from "../../setting/setting-mini-components"

export const notificationSettingTab = [
    { 
        label: "All Template",
        total: true,
        tabContent: <GetAllNotificationTemplate /> ,
      },
      { 
        label: "Other",
        tabContent: <h1>Tab Content 2</h1>,
        total: true
      },
      { 
        label: "App level",
        tabContent: <h1>Tab Content 3</h1>,
        total: true
      }
]