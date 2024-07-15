import React from 'react'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../../iam/components/reusable';
import * as Vsc from 'react-icons/vsc'
import { FlexBox, Text } from '../../../../components/common/StyledComponent';
import { Input } from '../../../../components/common';
import { FolderDataInterface } from '../../../models/folder-models';
import CreateFolder from './CreateFolder';

interface FolderContentModalStructure {
    title: string;
    openFolderId: boolean;
    // setIsOpenFolder?: React.Dispatch<React.SetStateAction<boolean>>
    handleOptionsAction: () => void,
    data: any
    abbreviation: string
}

interface FolderContentModal {
    [key: string]: JSX.Element;
  }

  const modalContent: FolderContentModal = {
    open_folder: <CreateFolder />,
    create_folder: <div>Update Folder Modal Content</div>,
    // upload_folder: <div>Upload Folder Modal Content</div>,
    // add_link: <div>Add Link Modal Content</div>,
    // open_word_doc: <div>Open Word Document Modal Content</div>,
    // excel_doc: <div>Open Excel Spreadsheet Modal Content</div>,
  };

const FolderContentModal = ({openFolderId, handleOptionsAction, title, data, abbreviation}: FolderContentModalStructure) => {
    console.log(data)

  return (
    openFolderId ? (
        <ModalWrapper>
             <ModalContainer className={`w-[50%] mx-auto bg-[#fff] flex flex-col relative top-[9%] shadow-2xl`}>
                <ModalHeader className='flex justify-between items-center px-5 py-[6px] border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins'>
                    <Text className='font-Rubik text-[17px] text-black text-opacity-50 text-center px-5'>{title}</Text>
                    <FlexBox className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleOptionsAction}> 
                        <Vsc.VscClose size={15} />
                    </FlexBox>
                </ModalHeader>
                <ModalBody className='flex flex-col items-center justify-center mx-3 my-5'>
                    {/* <FlexBox className='flex space-x-3'>
                       {data.folder_name}
                       {
                            data?.subfolder?.map((sub: any, index: any) => <div className='' key={index}>{sub.folder_name}</div>)}
                    </FlexBox>
                    <Input 
                        id='folder_search_input'
                        type='text'
                        name='search'
                        value='text'
                        placeholder='Search'
                        className='input-sm'
                    /> */}
                {modalContent[abbreviation]}
                </ModalBody>
                
            </ModalContainer>
        </ModalWrapper>
   ): null

  )
}

export default FolderContentModal