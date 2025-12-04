import React, {useCallback, useState} from 'react'
import { IntermediateAPIResponse } from '../../../models/request-model'
import { FlexBox } from '../../../../iam/components/reusable/StyledComponent'
import ApprovalAction from './ApprovalAction'
import useUtils from '../../../hooks/useUtils'
import { MdPreview } from "react-icons/md";
import { Div } from '../../../../components/common/StyledComponent'


interface ApprovalActionCellInterface {
    requestData: IntermediateAPIResponse;
    approvalStatus: Record<string | number, string>
}

const ApprovalActionCell = ({requestData, approvalStatus}: ApprovalActionCellInterface) => {

    const { open, handleIsOpenCloseMenuModal } = useUtils()
    
  return (
    <>
        <FlexBox className='flex space-x-3'>
            <Div onClick={handleIsOpenCloseMenuModal}>
                {
                    MdPreview({size: 20})
                }
            </Div>
        </FlexBox>

        <ApprovalAction 
            open={open}
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
            requestData={requestData}
            approvalStatus={approvalStatus}        
        />    
    </>
  )
}

export default ApprovalActionCell