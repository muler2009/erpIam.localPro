import React from 'react'
import { ModalContainer, ModalBody, ModalWrapper, ModalFooter } from '../../../../iam/components/reusable'
import { DelegationColumnInterface } from '../../../models/delegation-models';
import { FlexBox, Text, P, Div } from '../../../../components/common/StyledComponent';
import { IoInformationCircleSharp } from "react-icons/io5";
import { useRevokeDelegationMutation } from '../../../services/delegationAPI';

export interface RevokePropsInterface {
    rowData: DelegationColumnInterface;
    title: string; 
    handleIsOpenCloseMenu: (label: string) => void
    link_identifier: string;
    
}

const RevokeDelegationModal = ({title, handleIsOpenCloseMenu, link_identifier, rowData}: RevokePropsInterface)  => {

    const [revokeDelegation] = useRevokeDelegationMutation()

    
       
    const onDelegationRevokeClicked = async(id: string) => {
        try{
            const response = await revokeDelegation(id).unwrap()
            if(response.status_code === 202){
                handleIsOpenCloseMenu(link_identifier)
            }
        }catch(error){
            console.log(error)
        }

    }

    return(
        <ModalWrapper>
            <ModalContainer className={`w-[35%] mx-auto bg-gray-50 flex flex-col relative top-[30%] shadow-2xl rounded-[3px]`}>
                <ModalBody className='bg-gray-50 flex space-x-3 pt-10 pb-5 px-5 border-t-[3px] border-blue-600'>
                    {IoInformationCircleSharp({size: 50})}
                    
                    <FlexBox className='flex flex-col space-y-3'>
                        <Text className='font-Poppins text-[20px] font-semibold text-text-primary'>Revoking Delegation</Text>
                        <P>You are revoking  of <span className='font-semibold'>{rowData.delegatee_user}</span> delegation. Are you sure? </P>
                    </FlexBox>
                    
                </ModalBody>
                <ModalFooter className='border-t py-2 flex justify-end space-x-3 pr-10'>
                    <Div className='border-[2px] rounded-[3px] px-4 py-1 bg-[#3971c2] border-[#3971c2] text-white' onClick={() => onDelegationRevokeClicked(rowData.delegation_id)}>
                        Yes
                    </Div>
                    <Div className='border-[2px] border-text-primary rounded-[3px] px-4 py-1' onClick={() => handleIsOpenCloseMenu(link_identifier)}>
                        No
                    </Div>
                </ModalFooter>

            </ModalContainer>
        </ModalWrapper>
    ) 
 }


export default RevokeDelegationModal