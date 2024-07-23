import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { UserAccountInterfacee, UserCoulumn } from '../../../../models/user.model'
import StatusChanger from '../../user/views/StatusChanger'
import { format } from 'date-fns'
import * as BiIcons from 'react-icons/bi'
import * as CiIcons from 'react-icons/ci'
import * as Fa6Icons from 'react-icons/fa6'

import { useMemo } from 'react'
import { GroupMembersInterface } from '../../../../models/group.model'
import BottomTooltip from '../../../../../components/common/BottomTooltip'
import { FlexBox, FlexBoxInner } from '../../../../../components/common/StyledComponent'

const userColumn = createColumnHelper<UserCoulumn>()
const nestedUserColumn = createColumnHelper<GroupMembersInterface>()


const useUserColumn = () => {

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
                            className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white"  
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
         
            userColumn.accessor(row => `${row.account_modified_at}`, {
                id: "account_modified_at",
                header: () => <span>Registrerd Date</span>,
                cell: createdDate => {
                    const date_ = createdDate.getValue()
                    return(
                        <div className=''>{format(date_, 'EEE dd yyyy')}</div>
                    )
                },
                enableSorting: false
            }),
            userColumn.display({
                id: "actions",
                header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded /></span>,
                cell: ({row }) => {
                    return(
                        <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible">
                            <BottomTooltip content={`Rename`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.first_name} Edit Clicked`)}>
                                    <CiIcons.CiEdit size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                            <BottomTooltip content={`Delete`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.first_name} Delete Clicked`)}>
                                    <CiIcons.CiTrash size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                        </FlexBox>
                    )
                }
            }),

        ], []
    )

  return { userColumns }
}

export default useUserColumn


export const NESTED_COL = [
    nestedUserColumn.display({
        id: "selection",
        // header: ({table}) => {
        //     return(
        //         <input 
        //             type='checkbox'
        //             onChange={table.getToggleAllPageRowsSelectedHandler()}
        //             checked={table.getIsAllRowsSelected()}
        //             className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white" 
        //         />
        //     )
        // },
        cell: ({row}) => {
            return(
                <input 
                    type='checkbox'
                    onChange={row.getToggleSelectedHandler()}
                    checked={row.getIsSelected()}
                    className="w-[14px] h-[14px] rounded-[0px] appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white"  
                />
            )
        },
    
    }),
    nestedUserColumn.accessor(row => `${row.userId}`, {
        id: "userId",
        header: () => <span>User ID</span>,
        cell: cellprops => cellprops.getValue(),
        enableSorting: true,
        
        
        
    }),
    nestedUserColumn.accessor(row => `${row.first_name} ${row.last_name}`, {
        id: "Full name",
        header: () => <span className='white'>Full Name</span>,
    }),
    nestedUserColumn.accessor(row => `${row.email}`, {
        id: "email", 
        header: () => <span className=''>Email</span>,
        cell: cellprops => cellprops.getValue(),
        enableSorting: true
    }),
    nestedUserColumn.accessor(row => `${row.username}`, {
        id: "username",
        header: () => <span>Username</span>,
        cell: cellprops => cellprops.getValue(),
        enableSorting: true
    }),
    
    nestedUserColumn.accessor(row => `${row.account_modified_at}`, {
        id: "account_modified_at",
        header: () => <span>Registrerd Date</span>,
        cell: createdDate => {
            const date_ = createdDate.getValue()
            return(
                <div className=''>{format(date_, 'EEE dd yyyy')}</div>
            )
        },
        enableSorting: false
    })
]
