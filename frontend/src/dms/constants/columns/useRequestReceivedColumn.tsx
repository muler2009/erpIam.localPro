import React, { useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { IntermediateAPIResponse, RequestColumnInterface, RequestDataInterface, SendRequestApprovalInterface } from '../../models/request-model'
import * as BiIcons from 'react-icons/bi'
import { FlexBox, FlexBoxInner, Text } from '../../../components/common/StyledComponent'
import { format } from 'date-fns'
import TimeAgo from '../../../components/common/TimeAgo'
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { OpenFileForReview } from './column-mini-component'
import BottomTooltip from '../../../components/common/BottomTooltip'
import { RxEyeOpen } from "react-icons/rx";
import * as AiIcons from 'react-icons/ai'
import PerformTransition from './column-mini-component/PerformTransition'
import ApprovalActionCell from './column-mini-component/ApprovalActionCell'

const requestApprovalColumnHandler = createColumnHelper<IntermediateAPIResponse>()

const useRequestReceivedColumn = () => {
    const [approvalStatus, setApprovalStatus] = useState<Record<string | number, string>>({});

    const handleApprovalChange = (rowId: string | number, status: string) => {
        setApprovalStatus(prev => ({ ...prev, [rowId]: status }));
    };

    const requestApprovalColumn = useMemo(
        () => [
            requestApprovalColumnHandler.display({
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
           
            requestApprovalColumnHandler.accessor(row => row.request?.title, {
                id: "Title",
                header: () => <span>Request Informations</span>,
                cell: ({row}) => {
                    const request_recieved_at = row.original.request?.request_sent_at || new Date()
                    return(
                        <FlexBox className='flex flex-col gap-2 pb-2'>
                            <FlexBoxInner className='flex space-x-1'>
                                <Text className='font-semibold whitespace-nowrap'>{row.original.request?.title}</Text>
                                <TimeAgo timestamp={request_recieved_at} className='' />
                            </FlexBoxInner>
                            <FlexBox>
                            <p className='text-[12px] text-[#333] text-opacity-65'>Date: {format(request_recieved_at, 'EE dd, yyyy')}</p>
                                {/* {row.original.file_url} */}
                            </FlexBox>
                        </FlexBox>
                    )
                }
            }),
           
            requestApprovalColumnHandler.accessor(row => row.request?.file_url, {
                id: "file_url",
                header: () => <span>Attachment</span>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                        // <div>
                        //     {
                        //         rowData ? (
                        //             <p>Attachement available</p>
                        //         ): null
                        //     }
                        // </div>
                        <OpenFileForReview  
                            rowData={rowData}
                        />
                    )
                }
            }),

            requestApprovalColumnHandler.accessor(row => row.user, {
                id: "username",
                header: () => <span>Requested By</span>,
                cell: props => {
                   console.log(props.row.original)
                    return (
                        <div className='whitespace-nowrap'>
                            {props.row.original.user}
                        </div>
                    )
                }
            }),

            requestApprovalColumnHandler.accessor(row => row.action_taken, {
                id: "current_state",
                header: () => <span>Status</span>,
                cell: props => {
                    const current_state = props.row.original.current_state
                    const action_taken = props.row.original.action_taken
                    return (
                            <div className='whitespace-nowrap'>
                                {action_taken === "Rejected With Modification" ? (
                                    <p className='stamp is-rejected'>{action_taken}</p>
                                ) : current_state === 'pending for approval' ? (
                                    <p className='stamp is-waiting'>Waiting approval</p>
                                ) : (
                                    <p className='stamp is-default'>No action</p> // You can customize this default value
                                )}
                                                
                            </div>
                    )
                }
            }),
            requestApprovalColumnHandler.display({
                id: "actions",
                header: () => <Text>Action</Text>,
                cell: ({row}) => {
                    const requestData = row.original
                    return(
                        <ApprovalActionCell
                            requestData={requestData}
                            approvalStatus={approvalStatus}
                        
                        />
                    )
                }
            

            })
         
            // requestApprovalColumnHandler.display({
            //     id: "status",
            //     header: () => <span className="flex justify-start"><BiIcons.BiDotsVerticalRounded /> Action</span>,
            //     cell: ({row}) => {
            //         const rowData = row.original
            //         const approvalStatusForRow = approvalStatus[rowData.request?.request_id];  
            //         return(
            //             <FlexBox className="flex justify-start items-center space-x-3">
            //                 <BottomTooltip content={`See detail of the request`}>
            //                     <FlexBoxInner className="flex justify-center items-center hover:bg-gray-200 rounded-full">
            //                         <RxEyeOpen size={15} />
            //                     </FlexBoxInner>
            //                 </BottomTooltip>
            //                 <FlexBoxInner className='flex justify-start items-center space-x-5' >
            //                     <ApprovalSelect 
            //                         rowId={row.original.request?.request_id} 
            //                         onApprovalChange={handleApprovalChange}
            //                         currentStatus={approvalStatus[row.original.request?.request_id] }
            //                         rowData={rowData}
            //                     />
                              
            //                     <PerformTransition 
            //                         rowData={rowData} 
            //                         approvalStatus={approvalStatusForRow}
            //                     />
            //                 </FlexBoxInner>
            //           </FlexBox>
            //         )
            //     }
            // }),
        ],
        
        [approvalStatus, requestApprovalColumnHandler]
    )
    
    return {requestApprovalColumn}
}

interface ApprovalSelectProps {
    rowId: string | number;
    onApprovalChange: (rowId: string | number, status: string) => void;
    currentStatus?: string;
    rowData?: IntermediateAPIResponse;
}



export const ApprovalSelect: React.FC<ApprovalSelectProps> = ({ rowId, onApprovalChange, currentStatus, rowData }) => {
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
                <option value="Waiting for Approval">Waiting for Approval</option>
                <option value="Approved">Approved</option>
                <option value="Reject">Reject</option>
                <option value="Reject with modification">Reject with modification</option>

            </select>   
            <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none'>
                <AiIcons.AiOutlineCaretDown />
            </span>
        </FlexBox>
    );
};

export default useRequestReceivedColumn
















   // requestApprovalColumnHandler.accessor(row => row.current_state, {
            //     id: "Requesting Type",
            //     header: () => <span>Status</span>,
            //     cell: props => {
            //         return(
            //             <div className='whitespace-nowrap'>
            //                 {
            //                     props.row.original.current_state === 'pending for approval' ? (
            //                         <Text className='px-2 py-2 flex items-center text-blue-900'>
            //                             <span className='pr-1'><HiCheckCircle size={20}/></span>Waiting for approval
            //                         </Text>
            //                     ) : null 
            //                 }
            //             </div>
            //         )
            //     }
            // }),