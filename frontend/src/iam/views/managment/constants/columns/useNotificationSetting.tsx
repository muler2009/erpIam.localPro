import { createColumnHelper } from "@tanstack/react-table";
import { NotificationAPITemplateInterface } from "../../../../models/setting.models";
import { useMemo } from "react";


const notificationTemplateColumnHelper = createColumnHelper<NotificationAPITemplateInterface>()


const useNotificationSetting = () => {

    const notificationTemplateColumn = useMemo(
        () => [
            notificationTemplateColumnHelper.accessor(row => `${row.eventType_name}`, {
                id: 'template_name',
                header: () => <span>Template Name</span>,
                cell: (props) => {
                    return(
                        <div className="">{props.getValue()}</div>
                    )
                }
            }),
            notificationTemplateColumnHelper.accessor(row => `${row.default_channel}`, {
                id: 'template_channel',
                header: () => <span>Channel</span>,
                cell: (props) => {
                    return(
                        <div className="">{props.getValue()}</div>
                    )
                }
            }),
            notificationTemplateColumnHelper.accessor(row => `${row.subject}`, {
                id: 'subject',
                header: () => <span>Subject</span>,
                cell: (props) => {
                    return(
                        <div className="">{props.getValue()}</div>
                    )
                }
            }),

        ], [])


  return {notificationTemplateColumn}
}

export default useNotificationSetting