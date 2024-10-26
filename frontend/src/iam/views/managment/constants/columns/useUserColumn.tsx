import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { UserAPIResponse, UserCoulumn } from '../../../../models/user.model'
import { format } from 'date-fns'
import * as BiIcons from 'react-icons/bi'
import { useMemo } from 'react'
import { GroupMembersInterface } from '../../../../models/group.model'
import useCommonUtils from '../../../../../hooks/useCommonUtils'
import ActionOnUserComponent from './user-action-modal/ActionOnUserComponent'
import { useModal } from '../../../../components/reusable/custom-modal/context/useModal'

const userColumn = createColumnHelper<UserCoulumn>()
const nestedUserColumn = createColumnHelper<GroupMembersInterface>()

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
                cell: ({row}) => {
                    const rowData: UserAPIResponse = row.original;
                    return(
                        <ActionOnUserComponent  rowData={rowData} />
                    )
                }
            }),

        ], []
    )

  return { userColumns }
}

export default useUserColumn





