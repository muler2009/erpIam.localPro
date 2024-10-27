import React from 'react'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader, InputWithDesc } from '../../../../iam/components/reusable'
import * as Vsc from 'react-icons/vsc'
import { Button } from '../../../../components/common';
import CreateFolder from './CreateFolder';
import UploadFile from './UploadFile';
import { Text, FlexBox } from '../../../../components/common/StyledComponent';
import { ModalProps } from '../../../models/folder-models';

  interface ModalContent {
    [key: string]: JSX.Element;
  }

  
const ModalComponent = ({isOpen, handleIsOpenCloseMenu, title, abbreviation}: ModalProps) => {

    const modalContent: ModalContent = {
        create_folder: <CreateFolder isOpen={isOpen} handleIsOpenCloseMenu={handleIsOpenCloseMenu} title={title} abbreviation={abbreviation} />,
        // update_folder: <UploadFile />,
        // upload_folder: <div>Upload Folder Modal Content</div>,
        // add_link: <div>Add Link Modal Content</div>,
        // open_word_doc: <UploadFile />,
        // excel_doc: <UploadFile />,
      };
  return (

    <>
      {modalContent[abbreviation]}
    </>

    )  
}

export default ModalComponent