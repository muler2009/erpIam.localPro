import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { RequestColumnInterface, RequestDataInterface } from '../../models/request-model'
import * as BiIcons from 'react-icons/bi'
import { Text } from '../../../components/common/StyledComponent'
import { HiCheckCircle } from "react-icons/hi2";
import { MdPendingActions, MdCancel } from "react-icons/md";
import { OpenFileForReview } from './column-mini-component'
import { ReadFileForReview } from './column-mini-component/OpenFileForReview'

const requestColumnHandler = createColumnHelper<RequestDataInterface>()

const useRequestColumns = () => {
  
    const requestColumn = useMemo(
        () => [
            requestColumnHandler.display({
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
                            className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-primary-green before:checked:text-white"  
                        />
                    )
                },
                
            }),
            requestColumnHandler.accessor(row => row.title, {
                id: "Title",
                header: () => <span>Title</span>,
                cell: props => props.row.original.title
            }),
            requestColumnHandler.accessor(row => row.request_type, {
                id: "Requesting user",
                header: () => <span>Status</span>,
                cell: props => props.row.original.request_type
            }),
            requestColumnHandler.accessor(row => row.file_name, {
                id: "Requesting user",
                header: () => <span>Attached File</span>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                        <ReadFileForReview  
                            rowData={rowData}
                        />
                    )
                }
            }),
            requestColumnHandler.accessor(row => row.current_state, {
                id: "Requesting Type",
                header: () => <span>Status</span>,
                cell: props => {
                    return(
                        <div className='whitespace-nowrap'>
                            {
                                props.row.original.current_state === 'approved' ? (
                                    <div className='px-2 py-2 flex items-center text-green-600'>
                                        <span className='pr-1 stamp is-approved'>{props.row.original.current_state}</span>
                                    </div>
                                ) : props.row.original.current_state === 'Rejected' ? (
                                    <div className='flex items-center px-2 py-2'>
                                        <span className='pr-1 stamp is-nope'>{props.row.original.current_state}</span>
                                    </div>
                                ) : (
                                <Text className='text-yellow-600 flex items-center px-2 py-2'>
                                    <span className='pr-1 stamp is-pending'>{props.row.original.current_state}</span>
                                </Text>
                                )
                            }
                        </div>
                    )
                }
            }),
            requestColumnHandler.display({
                id: "status",
                header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded /></span>,
                cell: props => {
                    return(
                        <div className=''>Metadata</div>
                    )
                }
            }),
        ],
        []
    )
    
    return {requestColumn}
}

export default useRequestColumns