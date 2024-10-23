import React from 'react'
import { FlexBox, FlexOuterContainer, Div, Text } from '../../../../../components/common/StyledComponent'
import PolicyTabNavigationComponent from './PolicyTabNavigationComponent'
import { new_policy_tab_attribute } from '../../constants/iam-menu-items/policy'

const NewPolicyComponent = () => {
  return (
    <FlexOuterContainer className='mx-4 mb-5 pt-5'>    
        <PolicyTabNavigationComponent 
            tabs={new_policy_tab_attribute} 
            className='flex justify-end space-x-2 flex-grow pt-3 pb-3' 
            description={true}
            component={<TabHeading />}
        />
    </FlexOuterContainer>
  )
}


const TabHeading = () => {
    return(
        <Text className='text-[16px] font-Poppins font-semibold'>
            Creating New Permission Policy<span className='block text-[12px] font-Poppins font-normal pt-[2px] text-[#333] text-opacity-55'>
                {/* Adding new permissions by selecting any of your database table, and set action, statements and attach it to principal , */}
                Gabatee kuusdeetaa kee kamiyyuu filachuudhaan hayyama haaraa dabaluu, fi gocha, himoota saaguu fi ijootti maxxans
            </span>
        </Text>
    )
}

export default NewPolicyComponent