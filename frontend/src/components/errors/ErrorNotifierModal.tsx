import React from 'react'
import { ModalBody, ModalWrapper, ModalContainer, ModalHeader, ModalFooter } from '../../iam/components/reusable'
import { FlexBox, FlexBoxInner, Text } from '../common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import { ErrorResponseInterface } from '../../iam/models/error.model'

interface ErrorNotifierModalInterface {
    triggerMessageModal: boolean;
    errorMessage: ErrorResponseInterface | null;
    setTriggerMessageModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorNotifierModal = ({triggerMessageModal, errorMessage, setTriggerMessageModal}: ErrorNotifierModalInterface) => {
    return (
        triggerMessageModal ? (
            <ModalWrapper>
                <ModalContainer className='w-[35%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[5px] relative top-[25%]'>
                   <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                        <Text className=' text-[15px] font-Poppins flex justify-center items-center'>
                            <span className='mr-2'>
                            {/* <BiIcons.BiError size={25}/> */}
                            </span>
                            {/* {loginErrorMessage?.error_type} */}
                        </Text>
                        <VscIcons.VscClose size={20}  onClick={() => setTriggerMessageModal(prevState => !prevState)} />
                        
                   </ModalHeader>
                   <ModalBody className='px-5 py-5 bg-[#f5f5f5] h-full'>
                        <FlexBox className='px-3 pt-5 pb-1 flex space-x-3'>
                            <FlexBoxInner>
                                {/* <MdError size={70} color='red'/> */}
                            </FlexBoxInner>
                            <FlexBoxInner className='flex flex-col items-start justify-center'>
                                <Text className='font-semibold'>{errorMessage?.error_type}</Text>
                                <Text className='text-[14px]'>{errorMessage?.message}</Text>
                            </FlexBoxInner>
                        </FlexBox>
                   </ModalBody>
                   <ModalFooter className='flex justify-end items-center py-3 pr-5 cursor-pointer bg-[#f5f5f5] rounded-b-[4px]'>
                        <button className='btn-sm ring-1 px-10' onClick={() => setTriggerMessageModal(prevState => !prevState)}>Ok</button>
                        <></>
                    </ModalFooter>
                </ModalContainer>
            </ModalWrapper>
        ): null
      )
}

export default ErrorNotifierModal