import React from 'react'
import { useOutletContext } from 'react-router-dom';
import InputWithDesc from '../../../../../components/common/InputWithDesc';
import TextInput from '../../../../../components/common/TextInput';
import { FlexBox, Text, Div } from '../../../../../components/common/StyledComponent';
import { usePolicyContext } from '../context/usePolicyContext';
import useSelectPolicyResourceCreation from '../../../../hooks/useSelectPolicyResourceCreation';

interface OutletContextType {
  selectedResource: string;
  selectedApp: string;
  selectedModel: string;
}

const PolicyInformationComponent = () => {

  const { policyData, handlePolicyInputFieldChange } = usePolicyContext()
  const {selectedResource, selectedApp, selectedModel} = useOutletContext<OutletContextType>()

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
          <Div className="bg-gray-50 py-2 flex justify-end">
            { 
              selectedApp && (
                <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                  <input 
                      type="checkbox" 
                      name='is_app_level'
                      id="is_app_level_input" 
                      className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                      checked={policyData?.is_app_level}  
                      onChange={handlePolicyInputFieldChange}
                  />
                  <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                      Tick the box for application level permission
                  </Text>
                </label>  
              )
            }

            { 
              selectedModel && (
                <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                  <input 
                      type="checkbox" 
                      name='is_model_level'
                      id="is_model_level_input" 
                      className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                      checked={policyData?.is_model_level}  
                      onChange={handlePolicyInputFieldChange}
                  />
                  <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                      Tick the box for Model level permission
                  </Text>
                </label>  
               ) 
              }
          </Div>

          
   
   </FlexBox>
  )
}

export default PolicyInformationComponent