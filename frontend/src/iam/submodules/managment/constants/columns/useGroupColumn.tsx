import React, { useMemo } from 'react'
import { createColumnHelper} from '@tanstack/react-table'
import { GroupInterface } from '../../../../models/group.model'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

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
                        <div className={`text-[#4f46e5]`} onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? <AiIcons.AiFillFolderOpen size={20} /> : <AiIcons.AiFillFolderAdd size={20}  /> }
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
            groupColumn.accessor(row => `${row.members}`, {
                id: "members",
                header: () => <span>Users</span>,
                cell: ({row}) => {
                    return(
                        <div className='flex relative'>
                            <FaIcons.FaUserCircle size={20}/>
                            <div className=' flex justify-center items-center'>
                                <span className='absolute -top-2 left-[10%] w-4 h-4 rounded-full border flex items-center justify-center bg-red-700 text-white text-[10px]'>
                                    {row.original.members.length}
                                </span>
                            </div>
                        </div>
                    )
                },
                enableSorting: true
            }),
            groupColumn.accessor(row => `${row.group_created_at}`, {
                id: "group_created_at",
                header: () => <span>Created Date</span>,
                cell: cellprops => cellprops.getValue(),
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







