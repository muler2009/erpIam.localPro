import React from 'react'
import { FlexBox } from '../../../../iam/components/reusable/StyledComponent'
import SideMenuList from './SideMenuList'
import menus from './menus'
import { MenuItemInterface } from './side-bar-interface'

interface SideMenuInterface {
    menus: MenuItemInterface[] | undefined
}

const SideBarMain = ({menus = []}: SideMenuInterface) => {
  return (
    <FlexBox className='flex-grow'>
        <SideMenuList list={menus}  />
    </FlexBox>
  )
}

export default SideBarMain