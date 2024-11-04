import React, { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { NotificationColumn } from "../../models/notification-models"
import { FaFileArchive } from "react-icons/fa";
import { Div } from "../../../components/common/StyledComponent";
import { RiMessage3Fill } from "react-icons/ri";
import TimeAgo from "../../../components/common/TimeAgo";


const notificationColumnHelper = createColumnHelper<NotificationColumn>()

const useNotificationColumn = () => {
    const notificationColumn = useMemo(() => [
        notificationColumnHelper.display({
            id: "notification_status",
            header: () => null,
            cell: ({row}) => {
                return(
                    <div className="w-3 h-3 border rounded-full bg-green-300" />
                    
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
            cell: ({row }) => {
                
                return(
                    <div className="flex items-center">
                        <RiMessage3Fill  size={18} />
                        <span className="pl-[5px]">
                            {row.original.notification_message}
                        </span>
                    </div>
                )
            }
        }),
        notificationColumnHelper.accessor(row => row.notification_received_at, {
            id: "notification_received_at",
            cell: (row ) => {
                const recieced_at = row.getValue() || new Date()
                
                return(
                    <div>
                       <TimeAgo  timestamp={recieced_at} className="" />
                    </div>
                )
            }
        }),

        notificationColumnHelper.display({
            id: "actions",
            cell: ({row }) => {
                const rowData = row.original
                return(
                    <div className="border-[2px] border-text-primary rounded-[3px] flex justify-center">
                      <p className="px-5">Read</p>
                    </div>
                )
            }
        }),
    

    ], [])


    return{notificationColumn}
}


export default useNotificationColumn