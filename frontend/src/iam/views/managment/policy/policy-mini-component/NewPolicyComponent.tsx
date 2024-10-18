import React from 'react'
import { FlexBox, FlexOuterContainer, Div, Text } from '../../../../../components/common/StyledComponent'
import PolicyTabNavigationComponent from './PolicyTabNavigationComponent'
import { new_policy_tab_attribute } from '../../constants/iam-menu-items/policy'

const NewPolicyComponent = () => {
  return (
    <FlexOuterContainer className='mx-4 my-2'>
        <FlexBox className='flex flex-col pt-3 pb-4 px-5'>
            <Text className='text-[20px] font-Poppins font-semibold'>
                Creating New Permission Policy<span className='block text-[12px] font-Poppins font-normal pt-[2px] text-[#333] text-opacity-55'>
                    {/* Adding new permissions by selecting any of your database table, and set action, statements and attach it to principal , */}
                    Gabatee kuusdeetaa kee kamiyyuu filachuudhaan hayyama haaraa dabaluu, fi gocha, himoota saaguu fi ijootti maxxans
                </span>
            </Text>
            <PolicyTabNavigationComponent tabs={new_policy_tab_attribute} />
        </FlexBox>
    </FlexOuterContainer>
  )
}

export default NewPolicyComponent