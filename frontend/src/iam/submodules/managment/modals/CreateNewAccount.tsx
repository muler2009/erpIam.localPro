import React from 'react'
import * as Vsc from 'react-icons/vsc'
import { Input, ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable';
import { ModalProps } from '../../../models/user.model';
import { useGetRolesQuery } from '../../../features/roleAPI';
import UserDetail from '../user/views/UserDetail';
// import { CreateUserAccountContextProvider } from '../user/context/CreateUserAccountContext';
import * as GrIcons from 'react-icons/gr'
import useCreateUserAccount from '../user/context/useCreateUserAccount';
import { LiaStackExchange } from "react-icons/lia";
import { CompleteUserCreation, Permission, UserCreationSummary } from '../user/views';
import * as MdIcons from "react-icons/md";
import { SelectedRowContextProvider } from '../../../components/Table/CustomTable';

interface UserContainerInterface {
    [key: number]: React.ReactNode;
}


const CreateNewAccount = ({setIsOpen, isOpen, title} : ModalProps) => {

    const {data, isSuccess, isLoading} = useGetRolesQuery()
    const userRoles = data || []

    // const {userAccount, canSave, handleCreateAccInputChange} = useUserAccount()

    const {prevHide, submitHide, nextHide, disableNext, disablePrev, setPage, page, userCreationStep, newUserAccount} = useCreateUserAccount()


    const handlePrev = () => setPage(prev => prev - 1)
   
    const handleNext = () => setPage(prev => prev + 1)
         
    const display: UserContainerInterface = {
        0: <UserDetail />,
        1: <Permission />,
        2: <UserCreationSummary />,
        // 3: <CompleteUserCreation />  
    }

    console.log(Object.values(userCreationStep))
    return isOpen ? (
        // <CreateUserAccountContextProvider>
            <SelectedRowContextProvider>
                <form onSubmit={(event) => event.preventDefault()}>
                    <ModalWrapper>
                        <ModalContainer className={`w-[70%] mx-auto bg-[#fff] flex flex-col gap-4 relative top-[6%] shadow-2xl rounded-[5px]`} >
                            <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#131921] rounded-[5px]  text-[#fff] font-Poppins'>
                                <h1 className='font-Rubik text-[17px] text-opacity-50 text-center px-5'>
                                    {title}
                                </h1>
                                <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" 
                                onClick={(event) => setIsOpen(prevState => !prevState)}>
                                    <Vsc.VscClose size={15} />
                                </div>
                            </ModalHeader>
                            <ModalBody className='flex flex-col relative h-[65vh] overflow-y-scroll'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='fontt-Rubik font-semibold text-[20px] text-green-600 text-opacity-50 pl-16'>Adding new Identitiy </h1>
                                    <div className='flex justify-end px-16 border-b pb-1 border-opacity-80 border-gray-100 sticky top-0 bg-white '>
                                        {
                                            Object.keys(userCreationStep)?.map((title, index) => {
                                                const isActive = index === page
                                                return(
                                                    
                                                        <div key={index} className={`flex flex-col space-y-4 space-x-2 justify-end items-center py-3 cursor-pointer relative ${isActive && Object.values(userCreationStep).length - 1 !== index ? 'after:content-[""] after:absolute after:w-[60%] after:bg-green-500 after:top-[40%] after:left-20 after:h-[2px] ': null } `}>
                                                            <div className={`border rounded-full flex justify-center items-center w-12 h-12 ${isActive ? 'text-white transition duration-700 ease-in-out bg-green-500' : 'bg-white shadow-lg'}`} onClick={() => setPage(index)}>
                                                                {index + 1}
                                                            </div>
                                                            <p className={`font-Poppins px-2 text-sm ${isActive && 'text-green-600'} `}>{userCreationStep[title as keyof typeof userCreationStep]}</p>             
                                                        </div>        
                                                )
                                            })
                                        }   
                                    </div>                        
                                </div>
                                {/* <StepperBar /> */}
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

                                    <button className={`btn-sm stext-[12px] px-4 rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`}>Cretae user</button>
                                </div>
                            </ModalFooter>
                        </ModalContainer>
                    </ModalWrapper>
                </form>

            </SelectedRowContextProvider>
        // </CreateUserAccountContextProvider>
      ) : null;
}

export default CreateNewAccount



// 