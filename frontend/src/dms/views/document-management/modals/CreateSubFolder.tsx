import React from 'react'
import { InputWithDesc, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../../../../iam/components/reusable'
import { useGetFolderQuery } from '../../../services/folderAPISlice'
import { Input, Button } from '../../../../components/common'
import { FlexBox, FlexBoxInner, Text, P } from '../../../../components/common/StyledComponent'
import * as Vsc from 'react-icons/vsc'


interface FolderListProps {
    handleOptionsAction: () => void,
    title: string;
    folder_data: any;
    abbreviation: string;
    
  }

const CreateSubFolder = ({ handleOptionsAction, title, folder_data, abbreviation}: FolderListProps ) => {
    const {data, isSuccess, isLoading} = useGetFolderQuery()
  return (
    <ModalContainer className={`w-[30%] mx-auto bg-white border  flex flex-col relative top-[9%] shadow-2xl rounded-t`}>
        <ModalHeader className='flex flex-col pl-1 border-b-[1px] font-Poppins gap-2 rounded-t-md'>
            <FlexBox className='flex justify-between items-center relative'>
                <FlexBoxInner className='flex'>
                    <Text className='font-Poppins text-[13px] text-center px-5 text-[#333] text-opacity-60 flex'>
                        <P className='pr-2 text-black'>&#128193;</P>Create Folder
                    </Text>
                </FlexBoxInner>
                <FlexBoxInner className='pb-5'>
                    <FlexBoxInner className="flex justify-between items-center cursor-pointer border rounded-t hover:bg-[#bf503c] hover:text-white"> 
                        <div className='flex px-5 py-[2px]' onClick={handleOptionsAction}><Vsc.VscClose size={15} /></div>
                    </FlexBoxInner>
                </FlexBoxInner>
            </FlexBox>
        </ModalHeader>
        <ModalBody className='bg-[#fff] h-full px-5 py-2 w-full'>
            <FlexBox className='flex flex-col gap-3 mx-4 py-5'>

                <Input 
                    label='Root Folder'
                    id='folder_name_input'
                    type='text'
                    name="folder_name"
                    className='input-md disabled:bg-gray-100 text-[13px]'
                    placeholder='Folder name'
                    value={folder_data.folder_name}
                    disabled
                />

                <InputWithDesc 
                    label='Folder Name'
                    id='folder_name_input'
                    type='text'
                    name="folder_name"              
                    className='input-md'
                    placeholder='Folder name'

                />
            </FlexBox>
        </ModalBody>
        <ModalFooter className='flex justify-end pr-5 pt-3 pb-5 border-t space-x-3'>
            <Button label={`Create`}  className=' bg-blue-900 px-10 rounded-none text-sm text-white btn-sm'
            />
        </ModalFooter>
    </ModalContainer>
  )
}

export default CreateSubFolder