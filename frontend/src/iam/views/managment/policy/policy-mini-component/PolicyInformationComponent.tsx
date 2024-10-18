import React from 'react'
import InputWithDesc from '../../../../../components/common/InputWithDesc';
import TextInput from '../../../../../components/common/TextInput';
import { FlexBox, Text } from '../../../../../components/common/StyledComponent';
import { usePolicyContext } from '../context/usePolicyContext';


const PolicyInformationComponent = () => {

  const { policyData, handlePolicyInputFieldChange } = usePolicyContext()

  return (
   <FlexBox className='flex flex-col gap-5 mt-4 w-2/3'>
    <Text className='pt-2 font-semibold text-[16px] text-[#5e2f05]'>
      Basic Policy Information <span className='block font-normal text-[11px] text-[#333] text-opacity-50'>Specify basic policy information, such as name, version and descriptive text</span>
    </Text>

    <InputWithDesc 
            label='Policy name'
            id='policy_name_input'
            type='text'
            placeholder='Policy name'
            desc='Specify descriptive policy name'
            className='px-2 py-[7px] text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
            ease-in-out m-0 focus:text-gray-700 focus:outline-none'          
            name='policy_name'
            value={policyData?.policy_name}
            onChange={handlePolicyInputFieldChange}
          />
            <InputWithDesc 
              label='Policy Version'
              id='policy_version_input'
              type='number'
              placeholder='Policy name'
              desc='Specify descriptive policy version'
              className='px-2 py-[7px] text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
              ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none'            
              name='policy_version'
              value={policyData?.policy_version}
              onChange={handlePolicyInputFieldChange}
            />
            <TextInput 
              label='Description about the request'
              type='text'
              placeholder='Description'
              className='px-2 py-[7px] text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
              ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none'   
              rows={5}
              desc='optional'
              name='policy_description'
              value={policyData?.policy_description}
              onChange={handlePolicyInputFieldChange}
          
          />
   
   </FlexBox>
  )
}

export default PolicyInformationComponent