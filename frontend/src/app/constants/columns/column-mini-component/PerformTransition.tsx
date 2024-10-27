import React, {useState} from 'react'
import { IntermediateAPIResponse, RequestColumnInterface } from '../../../models/request-model';
import { usePerformTransitionRequestMutation, useDeleteUnapprovedRequestMutation } from '../../../services/requestAPISlice';
import { FlexBox, FlexBoxInner, Div } from '../../../../components/common/StyledComponent';
import BottomTooltip from '../../../../components/common/BottomTooltip';
import * as CiIcons from 'react-icons/ci'
import ConfirmDelete from '../../../../components/confirmations/ConfirmDelete';
import { PiCheckBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import useUtils from '../../../hooks/useUtils';


interface SendRequestCellProps {
    rowData: IntermediateAPIResponse;
    approvalStatus: string | undefined;
    comments: string | undefined;
    handleIsOpenCloseMenuModal: () => void;

}

const statusToActionMap: Record<string, string> = {
    "Waiting for Approval": "Waiting for Approval",
    "Approved": "approved",
    "Reject": "Rejected",
    "Reject with modification": "Rejected With Modification",
    "Submit": 'submit'
};

const PerformTransition = ({ rowData, approvalStatus, comments, handleIsOpenCloseMenuModal }: SendRequestCellProps) => {  

    const [performTransitionRequest] = usePerformTransitionRequestMutation()
    const [deleteUnapprovedRequest] = useDeleteUnapprovedRequestMutation()
    const [localStatus, setLocalStaus] = useState(approvalStatus)

    const onTransitionRequestSend = async() => {
       
        const status = approvalStatus ?? "Waiting for Approval"; // Default to "Waiting for Approval"
        const actionName = statusToActionMap[status];
        // const comments = statusToActionMap[status]
        if(actionName && rowData.request?.request_id ){
            const formData = new FormData();
            // check if there is comment if not empty send comment vale ele the default
            const defaultComments = comments && comments.trim() !== '' ? comments : 'No comments provided'; 
            formData.append('request_id', rowData.request?.request_id);
            formData.append('action_name', actionName);
            formData.append('comments', defaultComments); 

            if (rowData.request?.file) {
                formData.append('file', rowData.request?.file);
            }

            try {
                const response = await performTransitionRequest(formData);
                if (response.data?.status_code === 201){
                    handleIsOpenCloseMenuModal()
                    setLocalStaus("")
                }
            } catch (error) {
                console.log('Request failed:', error);
            }
            console.log(formData)
        }        
    }

    return (
        <FlexBox className='flex justify-start space-x-4'>
            <Div className='py-2'>
                <button className='btn-sm text-[12px] bg-red-500 px-5 text-white' onClick={handleIsOpenCloseMenuModal}>Close</button>
            </Div>
            <Div className='py-2'>
                {
                    approvalStatus === 'Approved' && (
                        <button className="text-[12px] bg-primary-green px-5 text-white btn-sm" onClick={onTransitionRequestSend}>
                            {approvalStatus}
                        </button>
                    )
                }
                {
                    approvalStatus === 'Reject' && (
                        <button className="text-[12px] bg-red-600 px-5 text-white btn-sm" onClick={onTransitionRequestSend}>
                            {approvalStatus}
                        </button>
                    )
                }
                {
                    approvalStatus === 'Reject with modification' && (
                        <button className="text-[12px] bg-blue-600 px-5 text-white btn-sm" onClick={onTransitionRequestSend}>
                            {approvalStatus}
                        </button>
                    )
                }

            </Div>
        </FlexBox>
    );
    
};

export default PerformTransition
{/* <ConfirmDelete 
    confirm={confirm}
    deleteInstance={deleteInstance}
    setConfirm={setConfirm}
    setDeleteInstance={setDeleteInstance}
    onDeleteConfirmed={onDeleteConfirmed}

/> */}