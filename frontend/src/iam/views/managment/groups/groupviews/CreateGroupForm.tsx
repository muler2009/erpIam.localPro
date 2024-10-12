import React from 'react'
import { InputWithDesc, TextInput } from '../../../../components/reusable'
import useGroup from '../groupHooks/useGroup'

const CreateGroupForm = () => {
  const { groupData, handleGroupInputChange} = useGroup()

  return (
    <form className='flex flex-col gap-5 w-2/3' onSubmit={(e) => e.preventDefault()}>
         <InputWithDesc 
            label='Group Abbreviation *'
            id= 'groupid_input'
            type='text'
            placeholder='Group Abbreviation'
            name='custom_group_abbreviation'
            className='input-md font-Poppins text-[13px]'
            desc='provide an abbreviation: GRP001'
            value={groupData.group_abbreviation}
            onChange={handleGroupInputChange}
        />
        <InputWithDesc 
            label='Group Name *'
            id= 'groupname_input'
            type='text'
            placeholder='Name '
            name='custom_group_name'
            className='input-md font-Poppins text-[13px]'
            label_description='Enter a meaningful name to identify the group'
            desc="Manimum 100 character. Don't use special charachers '+, $,#,% ...'"
            value={groupData.group_name}
            onChange={handleGroupInputChange}
        />
    </form>
    
  )
}

export default CreateGroupForm
