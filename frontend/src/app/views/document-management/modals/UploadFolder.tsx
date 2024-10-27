import React from 'react'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader, InputWithDesc } from '../../../../iam/components/reusable'
import { ModalProps } from '../../../../iam/models/user.model'
import * as Vsc from 'react-icons/vsc'
import { Button } from '../../../../components/common';

export interface FolderModalProps {
    isOpen: boolean;
    title: string;
    handleIsOpenCloseMenu: (label: string) => void;
    // handleIsOpenCloseMenu: () => void;
}

export const UploadFolder = ({title, handleIsOpenCloseMenu, isOpen}: FolderModalProps) => {
    return (
        isOpen ? (
    
            <ModalWrapper>
                <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[9%] shadow-2xl`}>
                    <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins'>
                        <h1 className='font-Rubik text-[17px] text-black text-opacity-50 text-center px-5'>
                            {title}
                        </h1>
                        {/* <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenu} > 
                            <Vsc.VscClose size={15} />
                        </div> */}
                    </ModalHeader>
                    <ModalBody className=' p-5'>
                       
                       <InputWithDesc 
                            label='Folder Name *'
                            id= 'groupid_input'
                            type='text'
                            placeholder='New Folder name'
                            name='custom_group_abbreviation'
                            className='input-md font-Poppins text-[13px]'
                            desc='provide an abbreviation: GRP001'
                            // value={groupData.group_abbreviation}
                            // onChange={handleGroupInputChange}                   
                        />
                    </ModalBody>
    
                    <ModalFooter className='flex justify-end pr-5 pt-3 pb-5 border-t space-x-3'>
                        <Button 
                            label={`Create`}
                            className=' bg-blue-900 px-10 rounded-none text-sm text-white'
                           
                        />
            
                    </ModalFooter>
                </ModalContainer>
            </ModalWrapper>
        )
     : null
      
    ) 
}
export default UploadFolder