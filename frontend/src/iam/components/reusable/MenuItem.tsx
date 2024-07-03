import React, { useState } from 'react'
// import MenuList from './MenuList'
import { Link } from 'react-router-dom'
import { SideBar } from '../../constants/sidebar'
import * as PiIcons from "react-icons/pi";

interface MenuItemProps {
  item: SideBar,
  controller: boolean
}


const MenuItem = ({item, controller}: MenuItemProps ) => {

  const [openClose, setOpenClose] = useState<{[key: string]: boolean}>({}) // Its a controller
  const handleToggleChildren = (index: string) => {
    setOpenClose({
          ...openClose,
          [index]: !openClose[index]
      })
  }

  return (
    <div className={`px-4 flex flex-col`}>
      {
        controller ? (
          <>
            <Link to={item.path || ""} onClick={() => handleToggleChildren(item.label)} className={`flex  justify-between pr-3 space-x-3 hover:bg-inherit hover:bg-opacity-90 py-1 w-full`}>
                <div className={`text-[#333] text-opacity-70 flex items-center space-x-3 hover:rounded-none focus:border-r-[5px] `} >
                    {item.icon}
                    <h1 className={`py-1 text-[13px] duration-500 font-Poppins `}>{item.label}</h1>
                </div>
                <div>
                  {
                    item && item.submenu && item.submenu.length > 0 ? 
                      <span className='cursor-pointer' >
                          {
                            openClose[item.label] ? <>{item.iconOpened}</> : <>{item.iconClosed}</>
                          }
                      </span> : null
                  }
                </div>
            </Link>
            <div className=''>
              {
                item && item.submenu && item.submenu.length > 0 && openClose[item.label] ? 
                    (
                      <div className={`cursor-pointer flex flex-col`}>
                          {/* <MenuList list={item.submenu} /> */}
                      </div>
                    )
                : null
              }
            </div>
          </>
        ) : (
          <div className={``}>
            <Link to={item.path || ""} onClick={() => handleToggleChildren(item.label)} className={`flex justify-between pr-3 space-x-3 hover:bg-inherit hover:bg-opacity-90 py-1 w-full`}>
              <div className={`pl-5 text-[#333] text-opacity-70 flex items-center space-x-3 hover:rounded-none focus:border-r-[5px]`} >
                  {item.icon}
                  <h1 className={`py-1 text-[13px] duration-500 font-Poppins ${controller && 'hidden' } `}>{item.label}</h1>
              </div>
              <div>
                {/* {
                  item && item.submenu && item.submenu.length > 0 ? 
                    <span className='cursor-pointer' >
                        {
                          openClose[item.label] ? <>{item.iconOpened}</> : <>{item.iconClosed}</>
                        }
                    </span> : null
                } */}
              </div>
            </Link>
          </div>
        )
      }

    </div>
  )
}

export default MenuItem
