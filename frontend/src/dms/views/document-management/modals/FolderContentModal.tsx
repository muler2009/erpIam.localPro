import React from 'react'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../../iam/components/reusable';
import * as Vsc from 'react-icons/vsc'
import { FlexBox, Text } from '../../../../components/common/StyledComponent';
import { Input } from '../../../../components/common';
import { FolderDataInterface } from '../../../models/folder-models';
import FolderList from './FolderList';
import CreateSubFolder from './CreateSubFolder';

interface FolderContentModalStructure {
    title: string;
    openFolderId: boolean;
    handleOptionsAction: () => void,
    folder_data: any
    abbreviation: string
}

interface FolderContentModal {
    [key: string]: JSX.Element;
  }

  
  const FolderContentModal = ({openFolderId, handleOptionsAction, title, folder_data, abbreviation}: FolderContentModalStructure) => {
    
    const modalContent: FolderContentModal = {
      open_folder: <FolderList handleOptionsAction={handleOptionsAction} title={title}  folder_data={folder_data} abbreviation={abbreviation} />,
      create_new_folder: <CreateSubFolder handleOptionsAction={handleOptionsAction} title={title}  folder_data={folder_data} abbreviation={abbreviation} />,
      // upload_folder: <div>Upload Folder Modal Content</div>,
      // add_link: <div>Add Link Modal Content</div>,
      // open_word_doc: <div>Open Word Document Modal Content</div>,
      // excel_doc: <div>Open Excel Spreadsheet Modal Content</div>,
    };
  

  return (
    openFolderId ? (
        <ModalWrapper>
            {modalContent[abbreviation]}
        </ModalWrapper>
    ): null

  )
}

export default FolderContentModal