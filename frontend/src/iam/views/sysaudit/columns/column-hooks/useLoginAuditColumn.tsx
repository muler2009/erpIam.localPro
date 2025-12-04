import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { LoginEventAuditLogInterface } from "../../../../models/sys_audit_interface";
import { format } from "date-fns";
import * as FaIcons from "react-icons/fa";

const loginAuditLogsHelper = createColumnHelper<LoginEventAuditLogInterface>()

const useLoginAuditColumn = () => {

    const loginEventColumn = useMemo(
        () => [
            loginAuditLogsHelper.display({
                id: "no",
                header: () => <p>No</p>,
                cell: ({row}) => row.index + 1
            }),
            loginAuditLogsHelper.accessor(row => `${row.full_name}`, {
                id: "full_name",
                header: () => <p className="font-normal">Logged user</p>,
                cell: (row) => {
                    return(
                        <div className={``}>
                            {row.row.original.full_name}
                        </div>
                    )
                }
            }),
            loginAuditLogsHelper.accessor(row => `${row.datetime}`, {
                id: "datetime",
                header: () => <p>Date</p>,
                cell: (row) => {
                    const login_date = row.getValue()
                    return(
                        <div className={``}>
                            {format(login_date, 'EEEE, dd MM yyy')}
                        </div>
                    )
                }
            }),
            loginAuditLogsHelper.accessor(row => `${row.datetime}`, {
                id: "datetime",
                header: () => <p>Logged Time</p>,
                cell: (row) => {
                    const login_date = row.getValue()
                    return(
                        <div className={``}>
                            {format(login_date, 'HH:MM:ss aaaa')}
                        </div>
                    )
                }
            }),
            loginAuditLogsHelper.accessor(row => `${row.login_type}`, {
                id: "login_type",
                header: () => <p className="font-normal">Login Status</p>,
                cell: ({row}) => {
                    const loginStatus = row.original.login_type
                    return(
                        <div className={`flex`}>
                            {
                                loginStatus === 1 ? (
                                    <div className="flex items-center bg-green-500 text-white px-2">
                                        <span className="pr-1">{FaIcons.FaCheck({size: 11})}</span>Successfully 
                                    </div>
                                ) : (
                                    <div className="text-red-500">
                                        Failed Login
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            }),
            
            loginAuditLogsHelper.accessor(row => `${row.remote_ip}`, {
                id: "remote_ip_address",
                header: () => <span>Remote IP address</span>,
                cell: ({row}) => {
                    return(
                        <div className="">
                            {row.original.remote_ip}
                        </div>
                    )
                }
            })          
        ], []
    )

    return { loginEventColumn }
  
}

export default useLoginAuditColumn