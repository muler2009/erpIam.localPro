import React from 'react'
import { ModalFooter } from '../../../../iam/components/reusable'
import { FlexOuterContainer } from '../../../../iam/components/reusable/StyledComponent'
import { Input, Button } from '../../../../components/common'

const UploadFile = () => {
    return (
        <FlexOuterContainer className='py-1 px-2'>
            <Input 
                label='Upload file Name'
                id='folder_name_input'
                type='file'
                name="folder_name"
                className="w-full text-gray-400 text-[12px] bg-white border border-gray-200 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 " 
                placeholder='Folder name'
    
            />
    
            <ModalFooter className='flex justify-end pt-3 pb-5 border-t space-x-3'>
                <Button label={`Create`}  className=' bg-blue-900 px-10 rounded-none text-[12px] text-white btn-sm' />
            </ModalFooter>
    
        </FlexOuterContainer>
      )
}

export default UploadFile