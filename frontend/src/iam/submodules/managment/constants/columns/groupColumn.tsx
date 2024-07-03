import { createColumnHelper} from '@tanstack/react-table'
import { GroupInterface } from '../../../../models/group.model'
import { ImFolderDownload } from "react-icons/im";
import * as AiIcons from "react-icons/ai";

const groupColumn = createColumnHelper<GroupInterface>()

export const GROUP_COLUMN = [
    // groupColumn.display({
    //     id: 'expand',
    //     cell: ({ row }) => 
    //     {
    //         return(
    //             row.getCanExpand() ? (
    //                 <div className='flex space-x-0 justify-center' >
    //                     <div className='' onClick={row.getToggleExpandedHandler()}>
    //                         {
    //                             row.getIsExpanded() ?  <AiIcons.AiFillFolderOpen size={20} className='border' /> : <AiIcons.AiFillFolderAdd size={20} className='border' /> 
                                
    //                         }
    
    //                     </div>
    //                 </div>
    //             ): null      
    //         )
    //     }
    //   }),
    groupColumn.display({
        id: 'expand',
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? 'A' : 'B'}
            </button>
          ) : null
        },
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
    // groupColumn.accessor(row => `${row.members}`, {
    //     id: "members",
    //     header: () => <span>Group Members</span>,
    //     cell: (cellprops) => {
    //         const val = cellprops.getValue()
    //         return(
    //             <div className='text-yellow-400'>
    //                 <ImFolderDownload size={20}/> 
    //             </div>
    //         )
    //     },
    //     enableSorting: true
    // }),
    


]