import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { RequestColumnInterface, RequestDataInterface } from '../../models/request-model'
import * as BiIcons from 'react-icons/bi'
import { Text } from '../../../components/common/StyledComponent'
import { HiCheckCircle } from "react-icons/hi2";
import { MdPendingActions, MdCancel } from "react-icons/md";

const requestColumnHandler = createColumnHelper<RequestDataInterface>()

const useRequestColumns = () => {
  
    const requestColumn = useMemo(
        () => [
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
                cell: props => props.row.original.file_name
            }),
            requestColumnHandler.accessor(row => row.current_state, {
                id: "Requesting Type",
                header: () => <span>Status</span>,
                cell: props => {
                    return(
                        <div className='whitespace-nowrap'>
                            {
                                props.row.original.current_state === 'Approved' ? (
                                    <Text className='px-2 py-2 flex items-center text-green-600'>
                                        <span className='pr-1'><HiCheckCircle size={20}/></span>{props.row.original.current_state}
                                    </Text>
                                ) : props.row.original.current_state === 'Rejected' ? (
                                    <Text className='text-red-600 flex items-center px-2 py-2'>
                                        <span className='pr-1'><MdCancel size={20}/></span>{props.row.original.current_state}
                                    </Text>
                                ) : (
                                <Text className='text-yellow-600 flex items-center px-2 py-2'>
                                    <span className='pr-1'><MdPendingActions size={20}/></span>{props.row.original.current_state}
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
            }),
        ],
        []
    )
    
    return {requestColumn}
}

export default useRequestColumns