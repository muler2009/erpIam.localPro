import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { AccessFailureLogsInterface } from '../../../../models/sys_audit_interface'
import { GiPadlock } from "react-icons/gi";
import UnlockComponentAction from '../action/UnlockComponentAction';


const lockedAccountColumnHelper = createColumnHelper<AccessFailureLogsInterface>()

const useLockedColumn = () => {

    const lockedAccountColumn = useMemo(
        () => [
            lockedAccountColumnHelper.display({
                id: "selection",
                header: ({table}) => {
                    return(
                        <input 
                            type='checkbox'
                            onChange={table.getToggleAllPageRowsSelectedHandler()}
                            checked={table.getIsAllRowsSelected()}
                            className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']"  
                            
                        />
                    )
                },
                cell: ({row}) => {
                    return(
                        <input 
                            type='checkbox'
                            onChange={row.getToggleSelectedHandler()}
                            checked={row.getIsSelected()}
                            className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']"  
  
                        />
                    )
                },
            }),

            lockedAccountColumnHelper.accessor(row => `${row.full_user_name}`, {
                id: "full_user_name",
                header: () => <p>Name</p>,
                cell: ({row}) => {
                    return(
                        <div className=''>
                            {row.original.full_user_name || "Not found"}
                        </div>
                    )
                }
            }),

            lockedAccountColumnHelper.accessor(row => `${row.username}`, {
                id: "username",
                header: () => <p>Username</p>,
                cell: ({row}) => {
                    return(
                        <div className=''>
                            {row.original.username || "Not found"}
                        </div>
                    )
                }
            }),


            lockedAccountColumnHelper.accessor(row => `${row.ip_address}`, {
                id: "ip_address",
                header: () => <p>IP Address</p>,
                cell: ({row}) => {
                    return(
                        <div className=''>
                            {row.original.ip_address}
                        </div>
                    )
                }
            }),

            lockedAccountColumnHelper.accessor(row => `${row.failures_since_start}`, {
                id: "failures_since_start",
                header: () => <p>Failures since Start</p>,
                cell: ({row}) => {
                    return(
                        <div className=''>
                            {row.original.failures_since_start}
                        </div>
                    )
                }
            }),
            
            lockedAccountColumnHelper.accessor(row => `${row.failure_count}`, {
                id: "failure_count",
                header: () => <p>Remaining time</p>,
                cell: ({row}) => {
                    return(
                        <div className=''>
                            {row.original.remaining_seconds}
                        </div>
                    )
                }
            }),
            lockedAccountColumnHelper.accessor(row => `${row.failure_count}`, {
                id: "failure_count",
                header: () => <p>Status</p>,
                cell: ({row}) => {
                    return(
                        <div className='flex justify-center items-center py-[2px] w-[100px] text-white bg-red-500 px-2 rounded-full'>
                           {GiPadlock({size: 15})}
                           <span className='pl-1'>locked</span> 
                        </div>
                       
                    )
                }
            }),
            lockedAccountColumnHelper.display({
                id: "action",
                header: () => <p>Action</p>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                      <UnlockComponentAction rowData={rowData} />                       
                    )
                }
            }),
            
        ], []
    )

  return { lockedAccountColumn }
}

export default useLockedColumn