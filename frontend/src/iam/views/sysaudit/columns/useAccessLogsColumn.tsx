import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { AccessFailureLogsAPIInterface, LoginEventAuditLogInterface } from "../../../models/sys_audit_interface";
import { format } from "date-fns";

const accessLogsHelper = createColumnHelper<AccessFailureLogsAPIInterface>()

const useAccessLogsColumn = () => {
   const accessSuccessLogsColumn = useMemo(
          () => [
              accessLogsHelper.display({
                  id: "no",
                  header: () => <p>No</p>,
                  cell: ({row}) => row.index + 1
              }),
              accessLogsHelper.accessor(row => `${row.user_agent}`, {
                  id: "user_agent",
                  header: () => <p className="font-normal">User Agent</p>,
                  cell: (row) => {
                      return(
                          <div className={``}>
                              {row.row.original.user_agent}
                          </div>
                      )
                  }
              }),
              accessLogsHelper.accessor(row => `${row.ip_address}`, {
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
              accessLogsHelper.accessor(row => `${row.username}`, {
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
              
              accessLogsHelper.accessor(row => `${row.attempt_time}`, {
                  id: "attempt_time",
                  header: () => <p>Logged-in Date</p>,
                  cell: (row) => {
                      const login_date = row.getValue()
                      return(
                          <div className={``}>
                              {format(login_date, 'EEEE, dd MM yyy, HH:MM:ss aaaa')}
                          </div>
                      )
                  }
              }),
              accessLogsHelper.accessor(row => `${row.attempt_time}`, {
                id: "attempt_time",
                header: () => <p>Logged-in Time</p>,
                cell: (row) => {
                    const login_date = row.getValue()
                    return(
                        <div className={``}>
                            {format(login_date, 'HH:MM:ss aaaa')}
                        </div>
                    )
                }
            }),
            
          ], []
      )
  
      return { accessSuccessLogsColumn }
  
}

export default useAccessLogsColumn