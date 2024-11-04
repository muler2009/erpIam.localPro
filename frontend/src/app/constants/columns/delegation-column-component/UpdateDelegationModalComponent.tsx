import React from 'react'
import { ModalContainer, ModalHeader, ModalBody, ModalWrapper } from '../../../../iam/components/reusable'
import { DelegationColumnInterface } from '../../../models/delegation-models';


export interface RevokePropsInterface {
    rowData: DelegationColumnInterface;
    title: string; 
    handleIsOpenCloseMenu: (label: string) => void
    link_identifier: string;
    
}

const UpdateDelegationModalComponent = ({title, handleIsOpenCloseMenu, link_identifier}: RevokePropsInterface) => {
    return(
        <ModalWrapper>
            <ModalContainer className={`w-[45%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
            <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b' >
                <button onClick={() => handleIsOpenCloseMenu(link_identifier)}>close</button>
                        {title}
                     </ModalHeader>
                     <ModalBody>
                         tddg
                     </ModalBody>
                 </ModalContainer>
        </ModalWrapper>
    ) 
}

export default UpdateDelegationModalComponent