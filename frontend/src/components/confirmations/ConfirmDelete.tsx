import React from 'react'
import { ModalBody, ModalContainer, ModalFooter, ModalWrapper, ModalHeader } from '../../iam/components/reusable'
import { Text, FlexBox, FlexBoxInner } from '../common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import { RequestColumnInterface } from '../../app/models/request-model'
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";

interface ConfirmModalPropsInterface {
    confirm: boolean;
    setConfirm: React.Dispatch<React.SetStateAction<boolean>>
    onDeleteConfirmed: () => Promise<void>
    setDeleteInstance: React.Dispatch<React.SetStateAction<RequestColumnInterface | null>>;
    deleteInstance: RequestColumnInterface | null
    
}

const ConfirmDelete = ({confirm, deleteInstance, setConfirm, onDeleteConfirmed}: ConfirmModalPropsInterface) => {
  return (
    confirm ? (
        <ModalWrapper>
            <ModalContainer className='w-[35%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[5px] relative top-[25%]'>
            <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                    <Text className=' text-[15px] font-Rubik flex justify-center items-center'>
                        <span className='mr-2'>
                            <GiConfirmed size={25}/> 
                        </span>
                     Confirmation
                    </Text>
                    <VscIcons.VscClose size={20}  onClick={() => setConfirm(prevState => !prevState)} />
                    
            </ModalHeader>
            <ModalBody className='px-5 py-5 bg-[#f5f5f5] h-full'>
                    <FlexBox className='px-3 pt-5 pb-1 flex space-x-3'>
                        <FlexBoxInner>
                           <BsFillQuestionCircleFill  size={35} />
                        </FlexBoxInner>
                        <FlexBoxInner className='flex flex-col items-start justify-center'>
                            <Text className='text-[14px]'>Do you want to remove the request?</Text>
                        </FlexBoxInner>
                    </FlexBox>
            </ModalBody>
            <ModalFooter className='flex justify-end items-center py-3 pr-5 cursor-pointer bg-[#f5f5f5] rounded-b-[4px]'>
                    <button className='btn-sm ring-1 px-10' onClick={onDeleteConfirmed}>Ok</button>
                    <></>
                </ModalFooter>
            </ModalContainer>
        </ModalWrapper>
    ): null
  )
}

export default ConfirmDelete