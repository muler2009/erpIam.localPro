import React from 'react'
import { useGetAllAddViewListQuery } from '../../../../features/policiesAPI'
import { FlexBox, Text } from '../../../../../components/common/StyledComponent'
import { usePolicyContext } from '../context/usePolicyContext'

const ViewPostPermissionComponent = () => {
    const {data, isSuccess} = useGetAllAddViewListQuery()
    const {policyData, handleCheckboxChange} = usePolicyContext()
 
    return (
        <FlexBox className='flex flex-wrap space-y-1'>
    
            {           
                isSuccess && (
                    data?.map((policy, index) => {
                        return(
                            <label className='flex gap-2 justify-start items-center w-1/3' key={index}>
                               <input 
                                   type="checkbox" 
                                   name={policyData.policy_action_name || ''}  // Ensure the name is a string
                                   id={`${policy.policy_action_name || ''}_input`} 
                                   className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center  checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['c']"
                                   onChange={() => handleCheckboxChange(policy.policy_action_name || '')}  // Update state when clicked
                                   checked={policyData.statements[0].action.includes(policy.policy_action_name || '')}  // Check if action is selected
 
                              />
                            <Text className='text-[13px] pl-[3px]'>
                              {policy.policy_action_name}

                            </Text>
                          </label>
                        )
                    })         
                )
            }
        </FlexBox>
      )
}

export default ViewPostPermissionComponent