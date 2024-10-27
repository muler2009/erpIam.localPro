import React, { useEffect } from 'react'
import { ModalFooter, ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../../../../iam/components/reusable'
import { FlexOuterContainer, FlexBox, FlexBoxInner, Text } from '../../../../iam/components/reusable/StyledComponent'
import { Input, Button } from '../../../../components/common'
import useCreareFolder from '../../../hooks/useCreareFolder'
import { useCreateFolderMutation } from '../../../services/folderAPISlice'
import useErrorState from '../../../../components/errors/useErrorState'
import ErrorNotifierModal from '../../../../components/errors/ErrorNotifierModal'
import { ModalProps } from '../../../models/folder-models'
import * as VscIcons from 'react-icons/vsc'
import useFolderAndFileExplorerActions from '../../../hooks/useFolderAndFileExplorerActions'
import { FolderCreateInterface } from '../../../models/folder-models'

interface CreateFolderModalInterface {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string;
    folderAttributes: FolderCreateInterface
    handleFolderCreationInputChanges: (event: React.ChangeEvent<HTMLInputElement>) => void
    // getParentFolder: string;
}

const CreateFolderM = ({isOpen, setIsOpen, title, folderAttributes, handleFolderCreationInputChanges }: CreateFolderModalInterface) => {

  const {errorMessage, triggerMessageModal, setErrors, setErrorMessage, setTriggerMessageModal} = useErrorState()

  const {canSave} = useCreareFolder()
 
  const [createFolder,  { isError, error } ] = useCreateFolderMutation()


  const onFolderSaveClicked = async() => {
    try{
      const response = await createFolder(folderAttributes).unwrap()
      if(response?.status_code === 201){
        setIsOpen(false)
      }else{
        console.log(response)
      }
    }catch(error: any){
      if(!error.data){
        console.log(error)
        const { error_type, status_code, message } = error.data;
        
      }else if(error.data.status_code === 400 ){
        setErrorMessage({
          error_type: error.data?.error_type,
          message: error.data?.message,
          status_code: error.status_code
        });
        setErrors(true);
        setTriggerMessageModal(prev => !prev);
      }
    }
    
    // console.log(folderAttributes)
  }

  return (
    isOpen ? (
      <ModalWrapper>
          <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[25%] shadow-2xl rounded-[3px]`}>
              <ModalHeader className='flex justify-between items-center p-2 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins rounded-md'>
                  <button className='px-5 text-[12px] btn-sm disabled:bg-gray-100 disabled:cursor-auto bg-gray-600 text-slate-200 text rounded-[4px] hover:bg-red-600 hover:text-white' onClick={() => setIsOpen(prev => !prev)} >
                    Cancel
                  </button>
                  <Text className='font-semibold font-IBMPlexSans text-center pr-5 text-[#333] text-opacity-60 text-[14px] flex-grow'>
                      {title}
                  </Text>
                  <button 
                    className='px-5 rounded-[4px] text-[12px] text-white btn-sm disabled:bg-gray-100 disabled:cursor-auto bg-primary-green' 
                    onClick={onFolderSaveClicked}
                    // disabled={!canSave}
                    > Create </button> 

                  
              </ModalHeader>
              <ModalBody className='p-5'>

                <FlexOuterContainer className='py-2 px-2'>
                
                    <Input 
                        // label='Folder Name'
                        id='parent_folder_input'
                        type='hidden'
                        name="parent_folder"
                        className='input-md'
                        placeholder='sadsad'
                        value={folderAttributes.parent_folder || ""} 
                       
                    />
                    <Input 
                        label='Folder Name'
                        id='folder_name_input'
                        type='text'
                        name="folder_name"
                        className='input-md'
                        placeholder='Folder name'
                        value={folderAttributes?.folder_name}
                        onChange={handleFolderCreationInputChanges}
                    />

                </FlexOuterContainer>
                </ModalBody>

                  <>
                    <ErrorNotifierModal 
                      triggerMessageModal={triggerMessageModal}
                      errorMessage= {errorMessage}
                      setTriggerMessageModal={setTriggerMessageModal}
                    />
                  </>   
          </ModalContainer>
      </ModalWrapper>
    ): null   
  )
}

export default CreateFolderM