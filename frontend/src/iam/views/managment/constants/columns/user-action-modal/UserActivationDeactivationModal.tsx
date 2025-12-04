import React from 'react'
import { ModalBody, ModalContainer, ModalHeader, ModalFooter, ModalWrapper } from '../../../../../components/reusable'
import { ModalComponentPropsInterface } from '../../../../../models/common-models'
import { Div, Text } from '../../../../../../components/common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import { UserAPIResponse } from '../../../../../models/user.model'
import { useToggelActivationAndDeactivationMutation } from '../../../../../features/userAPI'
import { PiWarningFill } from "react-icons/pi";

interface UserActivationDeactivationModalInterface extends ModalComponentPropsInterface {
    rowData?: UserAPIResponse
}

const UserActivationDeactivationModal = ({open, handleIsOpenCloseMenuModal, title, rowData}: UserActivationDeactivationModalInterface) => {

    const [toggelActivationAndDeactivation] = useToggelActivationAndDeactivationMutation()
    
    const onActivateDeactivateButtonClicked = async(id: any) => {
            try{
                const response = await toggelActivationAndDeactivation(id).unwrap()
                if (response.status_code === 201) {
                    handleIsOpenCloseMenuModal(); // Close the modal after the toast is triggered
                } else {
                    console.error("Unexpected status code received.");
                }
            }catch(error){
                console.log("Something went wrong")
            }
        }

  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[35%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-[#333]'>
                    <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-text-primary font-semibold text-opacity-80 '>{title}</Text>
                    <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-red-500 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        {
                            VscIcons.VscClose({
                                size: 20
                            })
                        }
                    </Div>
                </ModalHeader>
                <ModalBody className='px-5 py-2 bg-gray-50 flex space-x-2 justify-start'>
                    <div className={`text-red-700`}>
                        {
                            rowData?.is_active ? (
                                <div className={`flex flex-col gap-2 px-4 py-4`}>
                                    <h1 className={`text-[20px] font-IBMPlexSans font-semibold text-yellow-500 flex pb-2`}>
                                        <span className={`pr-2`}><>{PiWarningFill({})}</></span>
                                        Warning
                                    </h1>
                                    <p className={`text-nowrap text-[13px]`}>
                                        If this is the only user able to perform tasks. This will cause a serious disruption on your job.
                                        <span className={`block text-[#333] pt-1 text-opacity-90`}>Are you sure you want to deactivate "{rowData?.first_name} {rowData?.last_name}"?</span>
                                    </p>
                                </div>
                            ) : (
                                <div className={`flex flex-col gap-2 px-4 py-4`}>
                                    <h1 className={`text-[20px] font-IBMPlexSans font-semibold text-yellow-500 flex pb-2`}>
                                        <span className={`pr-2`}><>{PiWarningFill({})}</></span>
                                        Warning
                                    </h1>
                                    <p className={`text-[13px]`}>Your are activating user to use SIMS system with pre-assigned permission of associatee group.
                                        <span className={`block text-[#333]`}>Are you sure you want to activate "{rowData?.first_name} {rowData?.last_name} "</span>
                                    </p>
                                </div>
                            )
                        }
                    </div>
                        
                </ModalBody>
                <ModalFooter className='flex justify-end items-center space-x-3 py-3 pr-5 cursor-pointer bg-[#fff] rounded-b-[4px] border-t'>
                    <button 
                        className={`btn-sm py-1  px-10 ${rowData?.is_active ? 'hover:bg-red-500 font-semibold bg-red-400 text-white' : 'hover:bg-green-500 font-semibold bg-green-400 text-white'} text-[12px]`}
                        onClick={() => onActivateDeactivateButtonClicked(rowData?.user_account_id)}
                    >
                        {rowData?.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className={`btn-sm py-1 border px-10 text-[12px] hover:bg-red-500 hover:text-white hover:duration-500`} onClick={handleIsOpenCloseMenuModal}>No</button>
                </ModalFooter>
        </ModalContainer>

        </ModalWrapper>

    ): null
  )
}

export default UserActivationDeactivationModal