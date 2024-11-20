import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent'
import TabNavigation from '../../../../components/common/TabNavigation'
import { preferences_tab_menu } from '../../../../constants/menu-items/preferences'

const PreferencesDashboardComponent = () => {
  return (
    <FlexBox className='h-full'>
        <FlexBoxInner className='px-5 py-3 border-b'>
            <Text className='text-[20px] font-Poppins font-semibold text-text-primary'>
                Preferences Setting
                <span className='block text-[12px] font-normal text-[#333] text-opacity-60'>Setup your preferences</span>
            </Text>
        </FlexBoxInner>
       
        <TabNavigation 
          tabs={preferences_tab_menu} 
          className='px-2 cursor-pointer text-[#333] text-opacity-50 py-[5px]'
          custom='border-b bg-[#e8ebed] px-5'
          activeTab='border-b-[2px] border-black text-black -translate-x py-[5px]'
        />
        
    </FlexBox>
  )
}

export default PreferencesDashboardComponent