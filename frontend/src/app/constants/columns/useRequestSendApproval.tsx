import React, { useMemo, useState } from 'react'
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import { RequestColumnInterface, RequestDataInterface } from '../../models/request-model'
import * as BiIcons from 'react-icons/bi'
import { format } from 'date-fns'
import SelectComponent from '../../../components/common/SelectComponent'
import { FlexBox, FlexBoxInner, Text } from '../../../components/common/StyledComponent'
import * as AiIcons from 'react-icons/ai'
import TimeAgo from '../../../components/common/TimeAgo'
import SendRequestCell from './column-mini-component/SendRequestCell'



const requestSendColumnHelper = createColumnHelper<RequestColumnInterface>()

const useRequestSendApproval = () => {
    
    const [approvalStatus, setApprovalStatus] = useState<Record<string | number, string>>({});
    const handleApprovalChange = (rowId: string | number, status: string) => {
        setApprovalStatus(prev => ({ ...prev, [rowId]: status }));
    };
      
    const requestSendColumn = useMemo(
        () => [
            requestSendColumnHelper.accessor(row => row.title, {
                id: "Title",
                header: () => <span>Title</span>,
                cell: props => {
                    return(
                        <FlexBox className='flex flex-col gap-1 py-[2px]'>
                            <Text className='text-[14px] font-semibold text-text-primary'>{props.row.original.title}</Text>
                            {/* <Text className='text-[10px]'>
                                Request by: <span className='text-text-primary'>{props.row.original.file_url}</span>
                            </Text> */}
                        </FlexBox>
                    )
                }
            }),
            requestSendColumnHelper.accessor(row => row.file_url, {
                id: "file_for_approval",
                header: () => <span>File Attached</span>,
                cell: props => {
                    return(
                        <FlexBox className='flex flex-col gap-1 py-[2px]'>
                            <Text className='text-[14px] font-semibold text-text-primary'>{props.row.original.file_name}</Text>
                        </FlexBox>
                    )
                }
            }),
          
            requestSendColumnHelper.accessor(row => row.request_type, {
                id: "Requesting Type",
                header: () => <span>Request Type</span>,
                cell: (row) => row.getValue()
            }),
            requestSendColumnHelper.accessor(row => row.request_sent_at, {
                id: "request_sent_at",
                header: () => <span>Request Created</span>,
                cell: requested_Date => {
                    const request_sent_at = requested_Date.getValue() || new Date()
                    return(
                        <FlexBox className='flex space-x-2'>
                            <div className=''>{format(request_sent_at, 'EEE dd yyyy')}</div>
                            <TimeAgo timestamp={request_sent_at} className='text-[11px]' />
                        </FlexBox>
                    )
                }
            }),
            requestSendColumnHelper.accessor(row => row.request_updated_at, {
                id: "request_updated_at",
                header: () => <span> Request Updated</span>,
                cell: requested_Date => {
                    const request_updated_at = requested_Date.getValue() || new Date()
                    return(
                        <div className=''>{format(request_updated_at, 'EEE dd yyyy')}, {format(request_updated_at, 'HH:MM:ss')}</div>
                    )
                }
            }),
            requestSendColumnHelper.accessor(row => row.approval_status, {
                id: "approval_status",
                header: () => <span className="flex">Status</span>,
                // cell: ({row}) => <SelectApprovalActionCell row={row} />
                cell: ({row}) => {
                    return(
                        <Text>{row.original.approval_status}</Text>
                    )
                }
            }),
            requestSendColumnHelper.display({
                id: "Approval",
                header: () => <span className="flex "></span>,
                cell: ({row}) => (
                    <ApprovalSelect 
                        rowId={row.original.request_id} 
                        onApprovalChange={handleApprovalChange}
                        currentStatus={approvalStatus[row.original.request_id] }
                    />
                  )
            }),
            requestSendColumnHelper.display({
                id: "send",
                header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded /></span>,
                cell: ({ row }) => {
                    const rowData = row.original;  // Extracting the row data
                    const approvalStatusForRow = approvalStatus[rowData.request_id];  
                    return (
                        <SendRequestCell 
                            rowData={rowData} 
                            approvalStatus={approvalStatusForRow}
                        />
                )}     
            }),
        ],
        [approvalStatus]
    )
  return { requestSendColumn }
}


interface ApprovalSelectProps {
    rowId: string | number;
    onApprovalChange: (rowId: string | number, status: string) => void;
    currentStatus: string;
}

const ApprovalSelect: React.FC<ApprovalSelectProps> = ({ rowId, onApprovalChange, currentStatus }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        onApprovalChange(rowId, newStatus);
    };

    return (
        <FlexBox className='relative'>
            <select 
                id={`approve_input_${rowId}`}
                name={`approve`} 
                className="select-md rounded-sm font-Poppins py-1 w-full text-[12px]"   
                onChange={handleChange}
                value={currentStatus}
            >
                <option value="Not Approved">Not approved</option>
                <option value="Approved">Approved</option>
            </select>   
            <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none'>
                <AiIcons.AiOutlineCaretDown />
            </span>
        </FlexBox>
    );
};



export default useRequestSendApproval