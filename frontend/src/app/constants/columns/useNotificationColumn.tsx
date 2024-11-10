import React, { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { NotificationAPIResponse, NotificationColumn } from "../../models/notification-models"
import { FaFileArchive } from "react-icons/fa";
import { Div } from "../../../components/common/StyledComponent";
import { RiMessage3Fill } from "react-icons/ri";
import TimeAgo from "../../../components/common/TimeAgo";
import NotificationReadActionComponent from "./notification-column-action-component/NotificationReadActionComponent";
import { format } from "date-fns";


const notificationColumnHelper = createColumnHelper<NotificationColumn>()

const useNotificationColumn = () => {
    const notificationColumn = useMemo(() => [
        notificationColumnHelper.display({
            id: "notification_status",
            header: () => null,
            cell: ({row}) => {
                return(
                    <div className={`w-3 h-3 border rounded-full ${!row.original.notification_read ? 'bg-text-primary border-none': 'border border-gray-500'}`} />
                    
                )
            }
        }),
        notificationColumnHelper.display({
            id: "actions",
            cell: ({row }) => {
                const rowData = row.original
                return(
                    <Div className="">
                        <FaFileArchive size={18} />

                    </Div>
                )
            }
        }),
        notificationColumnHelper.accessor(row => row.notification_message, {
            id: "notification_message",
            cell: ({ row }) => {
                const notificationRowData = row.original;
              
                return (
                  <div className={`flex items-center font-IBMPlexSans ${!notificationRowData.notification_read ? 'font-bold text-text-primary' : 'font-normal'}`}>
                    <RiMessage3Fill size={18} />
                    <span className="pl-[5px]">
                      {notificationRowData.notification_message}
                    </span>
                  </div>
                );
              }
              
        }),
        notificationColumnHelper.accessor(row => row.notification_received_at, {
            id: "notification_received_at",
            cell: ({row}) => {
                // const recieced_at = row.getValue() || new Date()
                const recieced_at = row.original.notification_received_at || new Date()
                
                return(
                    <div>
                       {/* <TimeAgo  timestamp={recieced_at} className="" /> */}
                       {format(recieced_at, 'MMM dd')}
                    </div>
                )
            }
        }),

        notificationColumnHelper.display({
            id: "actions",
            cell: ({row }) => {
                const rowData = row.original
                return(
                    <NotificationReadActionComponent 
                        rowData={rowData}
                    />
                )
            }
        }),
    

    ], [])


    return{notificationColumn}
}




export default useNotificationColumn