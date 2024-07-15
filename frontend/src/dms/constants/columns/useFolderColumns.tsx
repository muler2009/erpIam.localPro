import { createColumnHelper, RowData } from '@tanstack/react-table'
import { useMemo, useState, useCallback } from 'react'
import { FolderColumn } from '../../models/folder-models'
import { format } from 'date-fns'
import { FlexBox, FlexBoxInner, P, Text } from '../../../components/common/StyledComponent'
import { AiFillFolder } from "react-icons/ai";
import FolderTableActions from './FolderTableActions'


const folderColumnHelper = createColumnHelper<FolderColumn>()
const DISPLAY_COLUMN_SIZE = 100;

const useFolderColumns = () => {

  const folderColumn = useMemo(
    () => [
        // folderColumnHelper.display({
        //     id: "selection",
        //         header: ({table}) => {
        //             return(
        //                 <input 
        //                     type='checkbox'
        //                     onChange={table.getToggleAllPageRowsSelectedHandler()}
        //                     checked={table.getIsAllRowsSelected()}
        //                     className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white" 
        //                 />
        //             )
        //         },
        // }),
        folderColumnHelper.display({
            id: "expand",
            cell: ({ row }) =>
            row.original.subfolder?.length && row.getCanExpand() ? (
                <div className='flex flex-col justify-center items-start cursor-pointer'>
                    <div className={`text-[#4f46e5] relative`} onClick={row.getToggleExpandedHandler()}>
                        {
                            row.getIsExpanded() 
                            ? <div className='text-[25px]'>&#128193;</div>
                            : <div className='text-[25px]'>&#128193;</div>
                        }
                    </div>
                </div>  
            ) : <div className='text-[25px] text-gray-600'><AiFillFolder /></div>,
            size: DISPLAY_COLUMN_SIZE,
        }),
        folderColumnHelper.accessor(row => row.folder_name, {
            id: "folder_name",
            header: () => <span>Name</span>,
            cell: (props) => {
                const date_created = props.row.original.folder_created_date || new Date()
                const date = format(date_created, 'EEE dd yyyy')
                return(
                    <FlexBox className='flex flex-col justify-center items-start'>
                        <FlexBoxInner className='flex space-x-2'>
                            {/* <span className='text-[18px]'>&#128193;</span> */}
                            <P>{props.getValue()}</P>
                        </FlexBoxInner>
                        <span className='text-[10px] text-[#333] text-opacity-50'>created: {date}</span>
                    </FlexBox>
                )
            },
            enableSorting: true
        }),
        folderColumnHelper.accessor(row => row.subfolder, {
            id: "subfolder",
            header: () => <span>Content</span>,
            cell: (props) => {
                const file_folder = props.row.original.subfolder
                return(
                    <FlexBox className='flex justify-start'>
                        {
                            file_folder?.length 
                            ? (
                                <P className='text-[11px] text-[#333] text-opacity-50'>
                                    {file_folder.length}<span className='pl-1'>items</span>
                                </P>
                            )
                            : <P className='text-[11px] text-[#333] text-opacity-50'>---</P>
                        }
                    </FlexBox>
                )
            },
            enableSorting: true
        }),
        folderColumnHelper.accessor(row => `${row.folder_updated_date}`, {
            id: "folder_updated_date",
            header: () => <span>Last Modified</span>,
            cell: modifiedDate => {
                const date_ = modifiedDate.getValue()
                return(
                    <div className=''>{format(date_, 'EEE dd yyyy')}, {format(date_, 'HH:MM:ss')}</div>
                )
            },
            enableSorting: false
        }),
        folderColumnHelper.display({
            id: "name",
            header: () => <span>Actions</span>,
            cell: ({ row }) => <FolderTableActions row={row} />
           
        })
    ], [])
    
    return {folderColumn}
}


  



export default useFolderColumns