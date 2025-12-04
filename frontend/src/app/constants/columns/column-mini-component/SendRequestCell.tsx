import React, {useState} from 'react'
import { RequestColumnInterface } from '../../../models/request-model';
import { useSendApprovedRequestByOwnerMutation, useDeleteUnapprovedRequestMutation } from '../../../services/requestAPISlice';
import { FlexBox, FlexBoxInner } from '../../../../components/common/StyledComponent';
import BottomTooltip from '../../../../components/common/BottomTooltip';
import * as CiIcons from 'react-icons/ci'
import ConfirmDelete from '../../../../components/confirmations/ConfirmDelete';
import { request } from 'http';


interface SendRequestCellProps {
    rowData: RequestColumnInterface;
    approvalStatus: string | undefined;
}

const SendRequestCell = ({ rowData, approvalStatus }: SendRequestCellProps) => {

    const [confirm, setConfirm] = useState<boolean>(false)
    const [deleteInstance, setDeleteInstance] = useState<RequestColumnInterface | null>(null)

    const [sendApprovedRequestByOwner] = useSendApprovedRequestByOwnerMutation()
    const [deleteUnapprovedRequest] = useDeleteUnapprovedRequestMutation()

    const onSendRequestSend = async() => {
        if(approvalStatus === "Approved"){
            const requestData = {
                request_id: rowData.request_id,
                action_name: 'submitted'
            }
                console.log(`Sending request for row ${requestData.action_name} ${requestData.request_id}`);
            try{
                const response = await sendApprovedRequestByOwner(requestData)
            }catch(error){
                console.log(error)
            }
        }
    };


    const onDeleteUnapprovedRequest = ({deleteInstance}: any) => {
        setDeleteInstance(deleteInstance)
        setConfirm(prevState => !prevState)
      }
    
      const onDeleteConfirmed = async() => {
        try {
          await deleteUnapprovedRequest(rowData.request_id)
        }catch(error){
          console.log(error)
        }finally{
          setConfirm(false)
        }
      }

    return (
        <FlexBox className='visible'>
            {
                approvalStatus === 'Approved' ? (
                    <FlexBoxInner className="bg-text-primary text-white  py-1 px-2 rounded-[2px] text-[12px] w-[120px]" onClick={onSendRequestSend}>
                        Send request
                    </FlexBoxInner>
                ):(
                    <FlexBox className="flex pr-20 w-[120px]">
                        <BottomTooltip content={`Edit request`}>
                            <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${rowData.approval_status} Edit Clicked`)}>
                                {CiIcons.CiEdit({size: 17})}
                            </FlexBoxInner>
                        </BottomTooltip>
                        <BottomTooltip content={`Delete`}>
                            <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => onDeleteUnapprovedRequest({deleteInstance: rowData})}>
                                {CiIcons.CiTrash({size: 17})}
                            </FlexBoxInner>
                        </BottomTooltip>
                    </FlexBox>
                )}

                <ConfirmDelete 
                    confirm={confirm}
                    deleteInstance={deleteInstance}
                    setConfirm={setConfirm}
                    setDeleteInstance={setDeleteInstance}
                    onDeleteConfirmed={onDeleteConfirmed}
                
                />
        </FlexBox>
    );

};

export default SendRequestCell