import React from 'react'
import { ModalProps } from '../../../../../models/user.model'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper, Input, ModalFooter } from '../../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import UserDetail from '../UserDetail'
import Permission from '../Permission'
import IdentityRegistrationForm from './IdentityRegistrationForm'
import IdentityAssignment from './IdentityAssignment'
import * as GrIcons from 'react-icons/gr'
import useAccountProps from '../../context/useAccountProps'
import { UserAccountContextProvider, useUserAccount } from '../../context/UserAccountContext'

interface UserContainerInterface {
    [key: number]: React.ReactNode;
}

const CreateUserIdentity = ({setIsOpen, isOpen, title} : ModalProps) => {

const {prevHide, submitHide, nextHide, disableNext, disablePrev, setPage, page=0, userCreationStep, userData, handleNext, handlePrev} = useUserAccount() || {}
 
const display: UserContainerInterface = {
    0: <IdentityRegistrationForm />,
    1: <IdentityAssignment />,
 
}

  return isOpen ? (
    <UserAccountContextProvider>
        <ModalWrapper>
            <ModalContainer className={`w-[40%] mx-auto bg-[#fff] flex flex-col gap-4 relative top-[6%] shadow-2xl`} >
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                    <h1 className='font-Rubik text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>
                        {title}
                    </h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" 
                    onClick={(event) => setIsOpen(prevState => !prevState)}>
                        <Vsc.VscClose size={15} />
                    </div>
                </ModalHeader>
                <ModalBody className='bg-white relative h-[70vh] '>
                    {/* <div className='after:absolute after:bg-gray-100 after:h-[1px] after:w-full after:top-[6%] after:px-1'>
                        <div className='flex justify-between pl-5 pb-1 border-opacity-80 border-gray-100 sticky top-0 bg-white'>
                            {
                                Object.keys(userCreationStep)?.map((title, index) => {
                                    const isActive = index === page
                                    return(
                                        <div key={index} className={`${isActive && 'relative'}`}>
                                            <p className={`font-Poppins px-2 text-sm text-[#333] text-opacity-60 ${isActive && 'text-green-600 after:border-b after:border-green-900 after:absolute after:bg-green-100 after:h-[1px] after:w-full after:top-[100%] after:left-0'} pb-4`}>
                                                {userCreationStep["0"]}
                                            </p>             
                                        </div>        
                                    )
                                })
                            }   
                        </div>                        
                    </div> */}
                <div className='flex flex-col'>
                    {display[page]}
                </div>
                </ModalBody>

                <ModalFooter className='px-4 py-4 flex justify-end space-x-3 border-t'>
                    <div className="flex justify-end space-x-5 pr-5 ">
                        <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] text-[#333] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>
                            <div className='flex justify-start items-center'>
                                <GrIcons.GrFormPrevious  size={15}/>
                                <p className='font-Poppins text-[14px]'>Prev</p>
                            </div>
                        </button>

                        <button  className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${nextHide}`} onClick={handleNext} disabled={disableNext}>
                            <div className='flex justify-start items-center '>
                                <p className='font-Poppins text-[14px]'>Next</p>
                                <GrIcons.GrFormNext size={15} />
                            </div>
                        </button>

                        <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`}>
                        <div className='flex justify-start items-center '>
                                <p className='font-Poppins text-[14px]'>Create</p>
                                <GrIcons.GrFormNext size={15} />
                            </div>
                        </button>


                    </div>
                </ModalFooter>
    
            </ModalContainer>
        </ModalWrapper>
    </UserAccountContextProvider>
    
      ): null
}

export default CreateUserIdentity