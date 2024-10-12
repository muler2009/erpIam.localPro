import React from 'react'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody } from '../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import { RoleModalPropsInterface } from '../../../../models/role.models'


const DownloadRoleAssignment = ({onRequestClose, title, isOpen, link_identifier}: RoleModalPropsInterface) => {
    return (
        <ModalContainer className={`w-[60%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-t-md`} >
        <ModalHeader className='flex justify-between items-center px-5 py-3'>
            <h1 className='font-Rubik text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</h1>
            <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={onRequestClose}>
                <Vsc.VscClose size={15} />
            </div>
        </ModalHeader>
        <ModalBody>
            <h1>Adding remove role</h1>
        </ModalBody>
    </ModalContainer>   
      )
}

export default DownloadRoleAssignment