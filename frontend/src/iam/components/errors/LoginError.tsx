import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import * as BiIcons from 'react-icons/bi'
import * as FaIcons from 'react-icons/fa'
import * as Io from 'react-icons/io'
import { ModalBody, ModalHeader, ModalFooter, ModalWrapper, ModalContainer } from '../reusable'
import useLogin from '../../auth/login/useLogin'
// import { LoginFailedModalInterface } from '../../models/login.model'
import { FlexBox, FlexBoxInner, Text } from '../reusable/StyledComponent'
import { ErrorResponseInterface } from '../../models/error.model'
import { MdError } from "react-icons/md";
import { useUserLoginMutation } from '../../auth/login/loginAPI'

interface LoginFailedModalInterface {
    loginErrorMessage: ErrorResponseInterface | null;
    loginFailed: boolean;
    setLoginFailed: React.Dispatch<React.SetStateAction<boolean>>
    
}

export const LoginErrorMessageModal = ({loginErrorMessage, loginFailed, setLoginFailed}: LoginFailedModalInterface ) => {
   
    const {isActive} = useLogin()

    console.log(isActive)
  
    return (
        loginFailed ? (
            <ModalWrapper>
                <ModalContainer className='w-[35%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[10px] relative top-[25%]'>
                   <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[10px] border-b border-gray-400 border-opacity-50'>
                        <Text className=' text-[15px] font-Poppins flex justify-center items-center'>
                            <span className='mr-2'>
                               OLB Error
                            {/* <BiIcons.BiError size={25}/> */}
                            {/* {loginErrorMessage?.error_type} */}
                            </span>
                        </Text>
                        <VscIcons.VscClose size={20} onClick={() => setLoginFailed(prevState => !prevState)} />

                   </ModalHeader>
                   <ModalBody className='px-5 py-5 bg-[#f5f5f5] h-full'>
                        <FlexBox className='px-3 pt-5 pb-1 flex space-x-3'>
                            <FlexBoxInner>
                                <MdError size={70} color='red'/>
                            </FlexBoxInner>
                            <FlexBoxInner className='flex flex-col items-start justify-center'>
                                <Text className='font-semibold'>{loginErrorMessage?.error_type}</Text>
                                <Text className='text-[14px]'>{loginErrorMessage?.message}</Text>
                                <Text>{loginErrorMessage?.status_code}</Text>

                            </FlexBoxInner>
                        </FlexBox>
                   </ModalBody>
                   <ModalFooter className='flex justify-end items-center space-x-3 py-3 pr-5 cursor-pointer bg-[#f5f5f5] rounded-b-[10px]'>
                        {
                            !isActive && (
                                <button className='btn-sm ring-1 px-10 bg-text-primary text-white' onClick={() => setLoginFailed(prevState => !prevState)}>Send Request for account activation</button>

                            )
                        }

                        <button className='btn-sm ring-1 px-10' onClick={() => setLoginFailed(prevState => !prevState)}>Ok</button>

                    </ModalFooter>
                </ModalContainer>
            </ModalWrapper>
        ): null
      )
}

