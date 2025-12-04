import React, { useState } from 'react'
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent'
import * as AiIcons from 'react-icons/ai'
import GetAllApplicationLevelPoliciesComponent from '../../policy/policy-mini-component/GetAllApplicationLevelPoliciesComponent'
import GetAllModelLevelPolicies from '../../policy/policy-mini-component/GetAllModelLevelPolicies'
import GetModelLevelPolicyForRole from '../mini-components/GetModelLevelPolicyForRole'
import GetApplicationLevelPolicyForRole from '../mini-components/GetApplicationLevelPolicyForRole'

const AttachPolicyToRoleComponent = () => {

    const [selected, setSelected] = useState("")

    const handleSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value)
    }

  return (
    <FlexBox className='px-3 pt-4 flex flex-col gap-2'> 
        <FlexBoxInner className={`relative`}>
            <Text className={`font-semibold after:content-[""] after:absolute after:bg-gray-200 after:top-[49%] after:left-[14%] after:h-[1px] after:w-[85%]`}>
                Attaching policy <span className='block text-[12px] text-[#333] font-normal text-opacity-60'>Attach any policies to the role being created</span>
            </Text>
        </FlexBoxInner>

        <FlexBoxInner className='flex flex-col gap-2'>
            <label  className='text-[14px] text-[#333] tracking-wide'>
                Select Policy Level
                <span className='block text-[11px] text-[#333] text-opacity-50'>select level of permission you want to create for and follow the prompt</span>
            </label>
            <Div className='relative'>
                <select 
                    id={`label_input`}
                    className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                    value={selected} 
                    onChange={handleSelectedChange}         
                >
                    <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                    <option value="" disabled>Select a resource</option>
                    <option value="app_level">App level Policy</option>
                    <option value="model_level">Model level Policy</option>
                
                </select>   
                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                    {AiIcons.AiOutlineCaretDown({})}
                </span>
            </Div>
        </FlexBoxInner> 

        <FlexBoxInner className=''>
            {
                selected === "app_level" && ( <GetApplicationLevelPolicyForRole showEntries={false} showSearch={true}  /> )
            }
             {
                selected === "model_level" && ( <GetModelLevelPolicyForRole  showEntries={false} showSearch={true}  showActions={true}/> )
            }
        </FlexBoxInner>

        

    </FlexBox>
  )
}

export default AttachPolicyToRoleComponent