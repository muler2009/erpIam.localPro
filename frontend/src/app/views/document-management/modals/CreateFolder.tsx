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


const CreateFolder = ({handleIsOpenCloseMenu, isOpen, abbreviation, title}: ModalProps) => {

  const {errorMessage, triggerMessageModal, setErrors, setErrorMessage, setTriggerMessageModal} = useErrorState()

  const {folderAttributes, handleFolderCreationInputChanges, canSave} = useCreareFolder()
  const [createFolder,  { isError, error } ] = useCreateFolderMutation()

  const onFolderSaveClicked = async() => {
    try{
      const response = await createFolder(folderAttributes).unwrap()
      if(response?.status_code === 201){
        handleIsOpenCloseMenu()
      }
    }
    catch(error: any)
    {
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
  }


  return (
    isOpen ? (
      <ModalWrapper>
          <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[25%] shadow-2xl rounded-md`}>
              <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins rounded-md'>
                  <Text className='font-Poppins text-center pr-5 text-[#333] text-opacity-60 text-[13px]'>
                      {title}
                  </Text>

                  <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenu} > 
                      <VscIcons.VscClose size={15} />
                  </div>
              </ModalHeader>
              <ModalBody className='p-5'>

                <FlexOuterContainer className='py-1 px-2'>

                    <Input 
                        // label='Folder Name'
                        id='folder_name_input'
                        type='hidden'
                        name="parent_folder"
                        className='input-md'
                        placeholder='Folder name'
                        value={folderAttributes?.parent_folder}
                        onChange={handleFolderCreationInputChanges}
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

                  <ModalFooter className='flex justify-end pr-5 pt-3 pb-5 space-x-3'>
                      <Button 
                        label={`create`}  
                        className='px-5 rounded-none text-sm text-white btn-sm disabled:bg-gray-100 disabled:cursor-auto bg-[#f2f2f2]' 
                        disabled={!canSave}
                        onClick={onFolderSaveClicked}
                      />
                  </ModalFooter>

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

export default CreateFolder