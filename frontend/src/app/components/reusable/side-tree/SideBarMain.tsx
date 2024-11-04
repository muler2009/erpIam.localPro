import React from 'react'
import SideMenuList from './SideMenuList'
import menus, { sidearBarLink } from './menus'
import { MenuItemInterface } from './side-bar-interface'
import { Div, FlexBoxInner, Text, FlexBox } from '../../../../components/common/StyledComponent'

interface SideMenuInterface {
    menus: MenuItemInterface[] | undefined
}

const SideBarMain = ({menus = []}: SideMenuInterface) => {

  return ( 
    <FlexBox className='flex flex-col space-y-7'>
       <FlexBoxInner className='flex flex-col space-y-3 relative'>
          <Div className='pl-5 after:content-[""] after:absolute after:w-[85%] after:h-[1px] after:bg-gray-200'>
            <Text className='text-sm text-text-primary font-semibold text-opacity-50 pb-2'>Main menu</Text>
          </Div>
          <SideMenuList list={menus} />
      </FlexBoxInner>

      <FlexBoxInner className='flex flex-col space-y-3 relative'>
          <Div className='pl-5 after:content-[""] after:absolute after:w-[85%] after:h-[1px] after:bg-gray-200'>
            <Text className='text-sm text-text-primary font-semibold text-opacity-50 pb-2'>Other menu</Text>
          </Div>
          <SideMenuList list={sidearBarLink} />
      </FlexBoxInner>
    </FlexBox>
  )
}

export default SideBarMain