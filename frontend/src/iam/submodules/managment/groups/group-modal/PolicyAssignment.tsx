import React from 'react'
import { FlexBox } from '../../../../components/reusable/StyledComponent'
import { TextInput } from '../../../../components/reusable'
import useGroupContext from '../context/useGroupContext'
import { Text } from '../../../../../components/common/StyledComponent'


const PolicyAssignment = () => {
  const {groupData, handleGroupAttributesChange} = useGroupContext()
  return (
    <FlexBox className='px-10 pt-4 '>
      <TextInput 
          label='Description'
          id='description_text'
          type='text'
          placeholder=''
          rows={5}
          className='input-md font-Poppins text-[13px]'
          desc={`description about the group, it's optional`}
          name='group_description'
          value={groupData?.group_description}
          onChange={handleGroupAttributesChange}
      
      /> 

      <FlexBox className='pt-3 relative'>
      <Text className='font-semibold text-[#26cc86] text-[15px] after:content-[""] after:absolute after:h-[1px] after:bg-gray-200 after:w-[78%] after:top-6 after:right-3'>Attach Permission Policy</Text>
      </FlexBox>

  </FlexBox>
  )
}

export default PolicyAssignment