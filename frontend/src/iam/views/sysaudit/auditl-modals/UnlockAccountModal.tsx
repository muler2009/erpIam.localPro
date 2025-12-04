import React from 'react'
import { ModalBody, ModalWrapper, ModalContainer, ModalFooter, ModalHeader } from '../../../components/reusable'
import { useUnLockAccaountManuallyMutation } from '../../../features/auditLogsAPI'
import { UnlockAccountModalInterface } from '../interface/action-interfaces'
import { Text,  } from '../../../components/reusable/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import useErrorState from '../../../hooks/useErrorState'
import useUnlockAccount from '../hooks/useUnlockAccount'

const UnlockAccountModal = ({open, handleIsOpenCloseMenuModal, title, rowData}: UnlockAccountModalInterface) => {
  const {onUnlockButtonClicked} = useUnlockAccount({ rowData, handleIsOpenCloseMenuModal })
  return (
     open ? (
         <ModalWrapper>
             <ModalContainer className={`w-[35%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                 <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-[#333]'>
                     <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-text-primary font-semibold text-opacity-80 '>{title}</Text>
                     <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-red-500 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        {
                            VscIcons.VscClose({
                            size: 15
                            })
                        }
                     </div>
                 </ModalHeader>
                 <ModalBody className='px-5 py-2 bg-gray-50 flex space-x-2 justify-start'>
                     <div className={`text-red-700`}>
                       are you going to unlock the user before 
                        {rowData?.username}
                     </div>
                         
                 </ModalBody>
                 <ModalFooter className='flex justify-end items-center space-x-3 py-3 pr-5 cursor-pointer bg-[#fff] rounded-b-[4px] border-t'>
                     <button 
                         className={`btn-sm py-1  px-10 ${rowData ? 'hover:bg-red-500 font-semibold bg-red-400 text-white' : 'hover:bg-green-500 font-semibold bg-green-400 text-white'} text-[12px]`}
                         onClick={onUnlockButtonClicked}
                     >
                       sadasdas
                     </button>
                     <button className={`btn-sm py-1 border px-10 text-[12px] hover:bg-red-500 hover:text-white hover:duration-500`} onClick={handleIsOpenCloseMenuModal}>No</button>
                 </ModalFooter>
         </ModalContainer>
 
         </ModalWrapper>
 
     ): null
    )
}

// onClick={() => onActivateDeactivateButtonClicked(rowData?.user_account_id)}

export default UnlockAccountModal