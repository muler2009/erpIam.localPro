import React from 'react'
import { FlexBox, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import { InputWithDesc, TextInput } from '../../../../components/reusable'
import CustomSelect from '../../../../components/reusable/CustomSelect'
import useRoleContextProps from '../context/useRoleContextProps'


const options: {label: string}[] = [
    {label: "active"},
    {label: "inactive"},
    {label: "deprecated"} 
  ]


const BasicRoleInformation = () => {

    const {roleData, handleRoleDataCreationInputChanges, handleInputChange} = useRoleContextProps()


  return (
    <FlexBox className='px-5 pt-4 flex flex-col gap-3 relative pr-5'>
        <InputWithDesc 
            label='Role name *'
            id= 'role_name'
            type='text'
            placeholder='Role name'
            name='role_name'
            className='input-md font-Poppins text-[13px]'
            desc='Name of the user'
            value={roleData?.role_name}
            onChange={handleRoleDataCreationInputChanges}
        />

        <FlexBoxInner className='flex space-x-3'>
            <InputWithDesc 
                label='Role scope *'
                id= 'role_scope_input'
                type='text'
                placeholder='Scope of the Role'
                name='role_scope'
                className='input-md font-Poppins text-[13px]'
                desc='example: departmental'
                value={roleData?.role_scope}
                onChange={handleRoleDataCreationInputChanges}
            />

            <CustomSelect 
                label="Role_status"
                name='role_status'
                options={options} 
                value={roleData?.role_status} 
                onChange={handleInputChange}               
            />
        

        </FlexBoxInner>
        <TextInput
            id='role_description'
            type='textarea'
            desc='description about the role'
            placeholder='sos'
            className='input-md'
            rows={4}
            name='role_description'
            value={roleData?.role_description}
            onChange={handleInputChange}
        />
    </FlexBox>
  )
}

export default BasicRoleInformation