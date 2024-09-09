import React, {useState} from 'react'
import { IntermediateAPIResponse, RequestColumnInterface } from '../../../models/request-model';
import { usePerformTransitionRequestMutation, useDeleteUnapprovedRequestMutation } from '../../../services/requestAPISlice';
import { FlexBox, FlexBoxInner } from '../../../../components/common/StyledComponent';
import BottomTooltip from '../../../../components/common/BottomTooltip';
import * as CiIcons from 'react-icons/ci'
import ConfirmDelete from '../../../../components/confirmations/ConfirmDelete';
import { PiCheckBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";


interface SendRequestCellProps {
    rowData: IntermediateAPIResponse;
    approvalStatus: string | undefined;
    comments: string | undefined;

}

const statusToActionMap: Record<string, string> = {
    "Waiting for Approval": "Waiting for Approval",
    "Approved": "approved",
    "Reject": "Rejected",
    "Reject with modification": "Rejected With Modification",
    "Submit": 'submit'
};

const PerformTransition = ({ rowData, approvalStatus, comments }: SendRequestCellProps) => {

    // const [confirm, setConfirm] = useState<boolean>(false)
    // const [deleteInstance, setDeleteInstance] = useState<RequestColumnInterface | null>(null)
    

    const [performTransitionRequest] = usePerformTransitionRequestMutation()
    const [deleteUnapprovedRequest] = useDeleteUnapprovedRequestMutation()

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

            if (rowData.request?.file_for_approval) {
                formData.append('file_for_approval', rowData.request?.file_for_approval);
            }

            try {
                const response = await performTransitionRequest(formData);
                console.log('Request successful:', response);
            } catch (error) {
                console.log('Request failed:', error);
            }
            console.log(formData)
        }

        
    }


    // const onDeleteUnapprovedRequest = ({deleteInstance}: any) => {
    //     setDeleteInstance(deleteInstance)
    //     setConfirm(prevState => !prevState)
    //   }
    
    //   const onDeleteConfirmed = async() => {
    //     try {
    //       await deleteUnapprovedRequest(rowData.request_id)
    //     }catch(error){
    //       console.log(error)
    //     }finally{
    //       setConfirm(false)
    //     }
    //   }

    return (
        <FlexBox className=''>
            {
                approvalStatus === 'Approved' && (
                    <FlexBoxInner className="text-[12px] bg-primary-green py-[7px] px-2 rounded-full" onClick={onTransitionRequestSend}>
                        <PiCheckBold size={15} color='white'/>
                    </FlexBoxInner>
                )
            }
            {
                approvalStatus === 'Reject' && (
                    <FlexBoxInner className="text-[12px] bg-red-700 py-[7px] px-2 rounded-full" onClick={onTransitionRequestSend}>
                        <IoCloseSharp size={15} color='white'/>
                    </FlexBoxInner>
                )
            }
            {
                approvalStatus === 'Reject with modification' && (
                    <FlexBoxInner className="text-[12px] bg-[#48a4df] py-[7px] px-2 rounded-full" onClick={onTransitionRequestSend}>
                        <IoCloseSharp size={15} color='white'/>
                    </FlexBoxInner>
                )
            }

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