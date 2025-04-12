import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { AccessFailureLogsInterface } from "../../../models/sys_audit_interface";
import { format } from "date-fns";
import * as FaIcons from "react-icons/fa";
import FailureLogsDetailComponent from "../auditl-modals/FailureLogsDetailComponent";

const accessFailureHelper = createColumnHelper<AccessFailureLogsInterface>()


const useAccessFailureColumn = () => {

    const accessFailureColumn = useMemo(
        () => [
            accessFailureHelper.display({
                id: "no",
                header: () => <p>No</p>,
                cell: ({row}) => row.index + 1
            }),
            accessFailureHelper.accessor(row => `${row.attempt_time}`, {
                id: "attempt_time",
                header: () => <p>Date</p>,
                cell: (row) => {
                    const login_date = row.getValue()
                    return(
                        <div className={``}>
                            {format(login_date, 'EEEE, dd MM yyy, HH:MM:ss aaaa')}
                        </div>
                    )
                }
            }),
            accessFailureHelper.accessor(row => `${row.user_agent}`, {
                id: "user_agent",
                header: () => <p className="font-normal">User Agent</p>,
                cell: (row) => {
                    return(
                        <div className={`text-wrap`}>
                            {row.row.original.user_agent}
                        </div>
                    )
                }
            }),
            accessFailureHelper.accessor(row => `${row.ip_address}`, {
                id: "ip_address",
                header: () => <span>IP address</span>,
                cell: ({row}) => {
                    return(
                        <div className="">
                            {row.original.ip_address}
                        </div>
                    )
                }
            }),
            accessFailureHelper.accessor(row => `${row.username}`, {
                id: "username",
                header: () => <span>Username</span>,
                cell: ({row}) => {
                    return(
                        <div className="">
                            {row.original.username}
                        </div>
                    )
                }
            }),
            accessFailureHelper.accessor(row => `${row.failure_count}`, {
                id: "failure_count",
                header: () => <span>Failed Attempts</span>,
                cell: ({row}) => {
                    return(
                        <div className="">
                            {row.original.failure_count}
                        </div>
                    )
                }
            }),
            accessFailureHelper.display({
                id: "details",
                header: () => <span>Deatils</span>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                        <FailureLogsDetailComponent rowData={rowData} />
                    )
                }
            })
          
        ], []
    )

    return { accessFailureColumn }
  
}

export default useAccessFailureColumn