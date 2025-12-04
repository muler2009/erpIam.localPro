import React, { useMemo } from 'react'
import { createColumnHelper} from '@tanstack/react-table'
import { GroupInterface } from '../../../../models/group.model'
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as CiIcons from "react-icons/ci";
import { format } from 'date-fns';



const DISPLAY_COLUMN_SIZE = 100;

const groupColumn = createColumnHelper<GroupInterface>()

const useGroupColumn = () => {

    const columns = useMemo(
        () => [  
            groupColumn.display({
                id: "expand",
                cell: ({ row }) =>
                row.getCanExpand() ? (
                    <div className='flex justify-center items-center cursor-pointer'>
                        <div className={``} onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? <>{IoIcons.IoMdArrowDropup({size: 18})}</> : <>{IoIcons.IoMdArrowDropdown({size: 18})}</> }
                        </div>
                    </div>  
                ) : null,
                size: DISPLAY_COLUMN_SIZE,
            }),
            groupColumn.accessor(row => `${row.group_posix_Id}`, {
                id: "group_posix_Id",
                header: () => <span>Group ID</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            groupColumn.accessor(row => `${row.group_name}`, {
                id: "group_name",
                header: () => <span>Group Name</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            groupColumn.accessor(row => `${row.group_abbreviation}`, {
                id: "group_abbreviation",
                header: () => <span>Grp Abbreviateion</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
         
            groupColumn.accessor(row => `${row.group_created_at}`, {
                id: "group_created_at",
                header: () => <span>Created Date</span>,
                cell: cellprops => {
                    const created_date = cellprops.getValue()
                    return(
                        <p>created_date</p>
                    )
                },
                enableSorting: true
            }),
            groupColumn.display({
                id: "actions",
                header: () => <span>Actions</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            
        ], []
    )

    return { columns }
}

export default useGroupColumn;







