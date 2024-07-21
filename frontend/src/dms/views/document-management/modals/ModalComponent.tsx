import React from 'react'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader, InputWithDesc } from '../../../../iam/components/reusable'
import * as Vsc from 'react-icons/vsc'
import { Button } from '../../../../components/common';
import CreateFolder from './CreateFolder';
import UploadFile from './UploadFile';
import { Text, FlexBox } from '../../../../components/common/StyledComponent';

interface ModalProps {
    isOpen: boolean;
    handleIsOpenCloseMenu: () => void;
    title: string;
    abbreviation: string;
}

  interface ModalContent {
    [key: string]: JSX.Element;
  }

  const modalContent: ModalContent = {
    create_folder: <CreateFolder />,
    update_folder: <UploadFile />,
    upload_folder: <div>Upload Folder Modal Content</div>,
    add_link: <div>Add Link Modal Content</div>,
    open_word_doc: <UploadFile />,
    excel_doc: <UploadFile />,
  };
 
  
const ModalComponent = ({isOpen, handleIsOpenCloseMenu, title, abbreviation}: ModalProps) => {
  return (
   isOpen ? (
        <ModalWrapper>
            <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[9%] shadow-2xl`}>
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins'>
                    <Text className='font-Poppins text-[14px] text-center pr-5 text-[#333] text-opacity-60'>
                        {title}
                    </Text>

                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenu} > 
                        <Vsc.VscClose size={15} />
                    </div>
                </ModalHeader>
                <ModalBody className='p-5'>
                    {modalContent[abbreviation]}
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
   ): null

    )  
}

export default ModalComponent