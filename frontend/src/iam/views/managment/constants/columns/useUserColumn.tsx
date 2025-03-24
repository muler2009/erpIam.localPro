import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { UserAPIResponse, UserCoulumn } from '../../../../models/user.model'
import { format } from 'date-fns'
import * as BiIcons from 'react-icons/bi'
import { useMemo, useState } from 'react'
import { GroupMembersInterface } from '../../../../models/group.model'
import useCommonUtils from '../../../../../hooks/useCommonUtils'
import ActionOnUserComponent from './user-action-modal/ActionOnUserComponent'
import { MdCheck, MdClose } from "react-icons/md";
import ActivationDeactivationTableCell from './user-action-modal/ActivationDeactivationTableCell'

const userColumn = createColumnHelper<UserCoulumn>()
const nestedUserColumn = createColumnHelper<GroupMembersInterface>()

interface ColumnInterface  {
    test?: boolean;
}

const useUserColumn = () => {
    const {open, handleIsOpenCloseMenuModal} = useCommonUtils()

    const userColumns = useMemo(
        () => [
            userColumn.display({
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
            userColumn.accessor(row => `${row.userId}`, {
                id: "userId",
                header: () => <span>User ID</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            userColumn.accessor(row => `${row.first_name} ${row.last_name}`, {
                id: "Full name",
                header: () => <span className='white'>Full Name</span>,
            }),
            userColumn.accessor(row => `${row.email}`, {
                id: "email", 
                header: () => <span className=''>Email</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            userColumn.accessor(row => `${row.username}`, {
                id: "username",
                header: () => <span>Username</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            userColumn.accessor(row =>`${row.group}`, {
                id: "group",
                header: () => <span>Group</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),

            userColumn.accessor(row => `${row.account_created_at}`, {
                id: "account_created_at",
                header: () => <span>Registered Date</span>,
                cell: createdDate => {
                    const date_ = createdDate.getValue()
                    return(
                        <div className=''>{format(date_, 'EEE dd yyyy')}</div>
                    )
                },
                enableSorting: false
            }),
         
            userColumn.accessor(row => `${row.account_modified_at}`, {
                id: "account_modified_at",
                header: () => <span>Modified Date</span>,
                cell: createdDate => {
                    const date_ = createdDate.getValue()
                    return(
                        <div className=''>{format(date_, 'EEE dd yyyy')}</div>
                    )
                },
                enableSorting: false
            }),
            
            userColumn.display({
                id: "activation",
                header: () => <span className="flex justify-end pr-10">Status</span>,
                cell: ({row}) => {
                    const rowData: UserAPIResponse = row.original;
                    return(
                        <ActivationDeactivationTableCell rowData={rowData} />
                    )
                }
            }),
            userColumn.display({
                id: "actions",
                header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded />Actions</span>,
                cell: ({row}) => {
                    const rowData: UserAPIResponse = row.original;
                    return(
                        <ActionOnUserComponent  rowData={rowData} />
                    )
                }
            }),

        ], []
    )


    const userDashboardColumn  = useMemo(
        () => [
            userColumn.display({
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
           
            userColumn.accessor(row => `${row.first_name} ${row.last_name}`, {
                id: "Full name",
                header: () => <span className='white'>Full Name</span>,
            }),
            userColumn.accessor(row => `${row.email}`, {
                id: "email", 
                header: () => <span className=''>Email</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            userColumn.accessor(row => `${row.username}`, {
                id: "username",
                header: () => <span>Username</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),

            userColumn.display({
                id: "is_Active",
                header: () => <span>Status</span>,
                cell: ({row}) => {
                   const isActive = row.original.is_active
                    return(
                        <div className="flex items-center gap-4">
                           {
                                isActive ? (
                                    <div className='flex space-x-1 items-center'>
                                        <span className='w-4 h-4 rounded-full  bg-green-500 text-white'>
                                            <MdCheck />
                                        </span>
                                        <h1 className='text-green-900 text-opacity-55 text-[12px] font-IBMPlexSans'>Active</h1> 
                                    </div>
                                ) : (
                                    <div className='flex space-x-1 items-center'>
                                        <span className='w-4 h-4 rounded-full  bg-red-500 text-white'>
                                            <MdClose />
                                        </span>
                                        <h1 className='text-green-900 text-opacity-55 text-[12px]'>Deactivated</h1> 
                                    </div>
                                )
                           }                       
                      </div>
                    )
                },
                enableSorting: false
            }),

            userColumn.accessor(row => `${row.account_modified_at}`, {
                id: "account_modified_at",
                header: () => <span>Account Modified Date</span>,
                cell: createdDate => {
                    const date_ = createdDate.getValue()
                    return(
                        <div className=''>{format(date_, 'EEE dd yyyy')}</div>
                    )
                },
                enableSorting: false
            }),
                

        ], []
    )

  return { userColumns, userDashboardColumn }
}



export default useUserColumn





