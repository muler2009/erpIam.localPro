import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { RoleTableColumn } from '../../../../models/role.models'
import { FlexBox } from '../../../../components/reusable/StyledComponent'
import { format } from 'date-fns'

const roleColumnHelper = createColumnHelper<RoleTableColumn>()

const useRoleColumn = () => {

    const roleColumn = useMemo(() => [

        roleColumnHelper.display({
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

        roleColumnHelper.accessor(row => `${row.role_name}`, {
            id: "role_name",
            header: () => <div>Role Name</div>,
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        {row.original.role_name}
                    </FlexBox>
                )
            }
        }),
        roleColumnHelper.display({
            id: "Type",
            header: () => <div>Type</div>,
            cell: (row) => <div>Custom</div>
        }),
        roleColumnHelper.accessor(row => `${row.role_scope}`, {
            id: "role_scope",
            header: () => <div>Scope</div>,
            cell: (row) => row.getValue()
        }),
        roleColumnHelper.accessor(row => `${row.role_status}`, {
            id: "role_status",
            header: () => <div>Status</div>,
            cell: (row) => row.getValue()
        }),
        roleColumnHelper.accessor(row => `${row.role_created_at}`, {
            id: "role_created_at",
            header: () => <div>Created Date</div>,
            cell: ({row}) => {
                const created_time = format(row.original.role_created_at || new Date, 'EE dd yyyy')
                return(
                    <div>{created_time}</div>

                )
            }
        }),
        roleColumnHelper.accessor(row => `${row.role_modified_date}`, {
            id: "role_modified_date",
            header: () => <div>Modified date</div>,
            cell: ({row}) => {
                const created_time = format(row.original.role_modified_date || new Date, 'EE dd yyyy')
                return(
                    <div>{created_time}</div>

                )
            }
        }), 
        roleColumnHelper.display({
            id: "role_modified_date",
            header: () => <div>Modified Time</div>,
            cell: ({row}) => {
                const modified_time = format(row.original.role_modified_date || new Date, 'HH : MM')
                return(
                    <div>{modified_time}</div>

                )
            }
        }), 

    ], [])

  return { roleColumn }
  
}

export default useRoleColumn