import React from 'react'
import { ModalProps } from '../../../../../models/user.model'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper, Input, ModalFooter } from '../../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import Permission from '../Permission'
import IdentityRegistrationForm from './IdentityRegistrationForm'
import IdentityAssignment from './IdentityAssignment'
import * as GrIcons from 'react-icons/gr'
import useAccountProps from '../../context/useAccountProps'
import { UserAccountContextProvider } from '../../context/UserAccountContext'
import { useUserAccountContext } from '../../context/useUserAccountContext'
import { AssignGroupToIdentityContextProvider } from '../../context/AssignGroupIdentityContext'
import { Text } from '../../../../../components/reusable/StyledComponent'
import { useCreateUserAccountMutation } from '../../../../../features/userAPI'

interface UserContainerInterface {
    [key: number]: React.ReactNode;
}

const CreateUserIdentity = ({setIsOpen, isOpen, title} : ModalProps) => {
    
    const [createUserAccount] = useCreateUserAccountMutation()

    const {
        prevHide,
        submitHide,
        nextHide,
        disableNext,
        disablePrev,
        setPage,
        page,
        userCreationStep,
        userData
      } = useUserAccountContext();
    
    const display: UserContainerInterface = {
        0: <IdentityRegistrationForm />,
        1: <IdentityAssignment />,
    }


    const handlePrev = () => setPage(prev => prev - 1);
    const handleNext = () => setPage(prev => prev + 1);

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await createUserAccount(userData).unwrap();
            if(response?.status === 201){
                setIsOpen(prev => !prev)
        }
        console.log(`response: ${response?.status}`)
        //  setIsOpen(false)
        } catch (error) {
        console.log(error);
        }
  }

  return isOpen ? (
   
        <AssignGroupToIdentityContextProvider>
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
                        <div className='after:absolute after:bg-gray-100 after:h-[1px] after:w-full after:top-[6%] after:px-1'>
                            <div className='flex justify-between pl-5 pb-1 border-opacity-80 border-gray-100 sticky top-0 bg-white'>
                                {
                                    Object.keys(userCreationStep)?.map((title: any, index) => {
                                        const isActive = index === page
                                        return(
                                            
                                                // <div key={index} className={`flex flex-col space-y-4 space-x-2 justify-end items-center py-3 cursor-pointer relative ${isActive && Object.values(userCreationStep).length - 1 !== index ? 'after:content-[""] after:absolute after:w-[60%] after:bg-green-500 after:top-[40%] after:left-20 after:h-[2px] ': null } `}>
                                                //     <div className={`border rounded-full flex justify-center items-center w-12 h-12 ${isActive ? 'text-white transition duration-700 ease-in-out bg-green-500' : 'bg-white shadow-lg'}`} onClick={() => setPage(index)}>
                                                //         {index + 1}
                                                //     </div>
                                                // </div>        
                                                    <Text className={`font-Poppins px-2 text-sm ${isActive && 'text-green-600'} `}>
                                                        {userCreationStep[title]}
                                                    </Text>             
                                        )
                                    })
                                }   
                            </div>                        
                        </div>
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

                            <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`} onClick={onSaveClicked}>
                                <div className='flex justify-start items-center '>
                                    <p className='font-Poppins text-[14px]'>Create</p>
                                    <GrIcons.GrFormNext size={15} />
                                </div>
                            </button>
                        </div>
                    </ModalFooter>
                </ModalContainer>
            </ModalWrapper>
        </AssignGroupToIdentityContextProvider>
   
    
      ): null
}

export default CreateUserIdentity