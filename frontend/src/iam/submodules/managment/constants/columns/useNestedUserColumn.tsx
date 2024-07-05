import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { UserAccountInterface, UserCoulumn } from '../../../../models/user.model'
import StatusChanger from '../../user/views/StatusChanger'
import { format } from 'date-fns'
import { columns } from '../../../../constants/columns'
import { useMemo } from 'react'
import { GroupMembersInterface } from '../../../../models/group.model'

const nestedUserColumn = createColumnHelper<GroupMembersInterface>()

const useNestdUserColumn = () => {

    const nestedColumn = useMemo(
        () => [
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

        ], []
    )

    return{ nestedColumn }

}

export default useNestdUserColumn