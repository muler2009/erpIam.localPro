import React from 'react'
import { ModalFooter } from '../../../../iam/components/reusable'
import { FlexOuterContainer } from '../../../../iam/components/reusable/StyledComponent'
import { Input, Button } from '../../../../components/common'

const CreateFolder = () => {
  return (
    <FlexOuterContainer className='py-1 px-2'>
        <Input 
            label='Folder Name'
            id='folder_name_input'
            type='text'
            name="folder_name"
            className='input-md'
            placeholder='Folder name'

        />

        <ModalFooter className='flex justify-end pr-5 pt-3 pb-5 border-t space-x-3'>
            <Button label={`Create`}  className=' bg-blue-900 px-10 rounded-none text-sm text-white btn-sm'
            />
        </ModalFooter>

    </FlexOuterContainer>
  )
}

export default CreateFolder