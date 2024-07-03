import React from 'react'
import { SideBar } from '../../constants/sidebar'
import SideMenuList from './SideMenuList'



const SubMenuItems = ({listItem}: any) => {
  return (
    <div>
        {
          listItem && listItem.submenu && listItem.submenu.length > 0  ? 
            (
                <div className='px-5 cursor-pointer'>
                    {/* <SideMenuList sidebarItems={listItem.submenu} /> */}
                </div>
            )
        : null
      }
    </div>
  )
}

export default SubMenuItems
