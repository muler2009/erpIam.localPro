import React, { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { NotificationAPIResponse, NotificationColumn } from "../../models/notification-models"
import { FaFileArchive } from "react-icons/fa";
import { Div, Text } from "../../../components/common/StyledComponent";
import { RiMessage3Fill } from "react-icons/ri";
import TimeAgo from "../../../components/common/TimeAgo";
import NotificationReadActionComponent from "./notification-column-action-component/NotificationReadActionComponent";
import { format } from "date-fns";


const notificationColumnHelper = createColumnHelper<NotificationColumn>()

const useNotificationColumn = () => {
    const notificationColumn = useMemo(() => [
        notificationColumnHelper.display({
            id: "selection",
            header: ({table}) => {
                return(
                    <input 
                        type='checkbox'
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        checked={table.getIsAllRowsSelected()}
                        className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white" 
                    />
                )
            },

            cell: ({row}) => {
                return(
                    <input 
                        type='checkbox'
                        onChange={row.getToggleSelectedHandler()}
                        checked={row.getIsSelected()}
                        className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-primary-green before:checked:text-white"  
                    />
                )
            },
        }),
        // notificationColumnHelper.display({
        //     id: "actions",
        //     cell: ({row }) => {
        //         const rowData = row.original
        //         return(
        //             <Div className="">
        //                 <FaFileArchive size={18} />

        //             </Div>
        //         )
        //     }
        // }),
        notificationColumnHelper.accessor(row => row.notification_sender, {
            id: "notification_sender",
            cell: ({ row }) => {
                const notificationRowData = row.original;
              
                return (
                  <div className={`flex items-center font-IBMPlexSans ${!notificationRowData.notification_read ? 'font-bold text-text-primary' : 'font-normal'}`}>
                      {notificationRowData.notification_sender}
                  </div>
                );
              }
              
        }),
        notificationColumnHelper.accessor(row => row.notification_message, {
            id: "notification_message",
            cell: ({ row }) => {
                const notificationRowData = row.original;
              
                return (
                  <div className={`flex items-center font-Poppins ${!notificationRowData.notification_read ? 'font-bold text-text-primary' : 'font-normal'}`}>
                    <Text className="text-[14px]">
                        [{notificationRowData.subject}]
                        <span className="pl-[5px] text-[12px]">
                            {notificationRowData.notification_message}
                        </span>

                    </Text>
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