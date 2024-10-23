import React from 'react'
import PolicyTabNavigationComponent from './PolicyTabNavigationComponent'
import { policy_type_tab_menu } from '../../constants/iam-menu-items/policy'
import { FlexBox } from '../../../../../components/common/StyledComponent'

const PolicyMain = () => {
  return (
    <FlexBox className='pt-5'>
        <PolicyTabNavigationComponent tabs={policy_type_tab_menu} className='flex justify-start space-x-2 flex-grow pt-3 pb-3' />
    </FlexBox>
  )
}

export default PolicyMain