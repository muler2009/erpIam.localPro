import React, { useState, useCallback } from 'react'
import * as MdIcons from 'react-icons/md'
import TreeMenuList from './TreeMenuList'
import { TreeMenuItemInterface } from './tree-menu-interface'
import BottomTooltip from '../../../../components/common/BottomTooltip'
import { useSelector } from 'react-redux'
import { username } from '../../../api/auth' 
import { FlexBox, Text } from '../StyledComponent'
import { FaUserCircle } from 'react-icons/fa'

interface SideMenuInterface {
  menu: TreeMenuItemInterface[] | undefined
}

const MainTree = ({menu = []}: SideMenuInterface) => {

  const [controller, setController] = useState<boolean>(true)
  const handleOpenCloseSideBar = useCallback(() => {setController(prev => ! prev)}, [])
  const loggedUser = useSelector(username)

  return (
      <div className={`font-IBMPlexSans flex flex-col h-screen border-t border-b border-gray-100 border-opacity-40 z-10 cursor-pointer overflow-x-hidden text-[#333] ${controller ? 'w-[23rem] bg-button-primary border-r border-gray-300': 'w-[70px] bg-[#232e31] text-white'}`}>
        <div className={`relative pt-5 px-1`}>
            <div className={`${controller ? 'flex justify-between items-start pr-5 border-opacity-20' : 'block pt-5'  } `}>
                <div className={`pb-[3px] ${!controller ? 'hidden': 'flex' }`}>
                    <div className='px-5 flex items-center flex-grow py-2 space-x-4 '>  
                        <div className={`w-12 h-12 flex justify-center items-center text-[#fff]`}>
                            <FaUserCircle size={50} />
                        </div>
                        <h6 className={`flex text-white text-opacity-80`}>
                            <p className='font-MonaSans'>
                                {loggedUser || 'Username'}<span className='block font-Poppins font-normal text-[13px]'>email@emailadmin.org</span>
                            </p>
                        </h6>                    
                    </div>
                </div>
                <div className={` flex justify-center items-start text-[#fff] pt-3`}>
                    {
                        !controller
                        ? (
                            <div className='shadow-md '>
                                <MdIcons.MdMenu size={25} onClick={handleOpenCloseSideBar}/>
                            </div>
                        ) : (
                            <div className='shadow-sm '>
                                <MdIcons.MdMenu size={25} onClick={handleOpenCloseSideBar}/>
                            </div>
                        ) 
                    }
                </div>
            </div>

            <div className='flex flex-col py-4 text-black mt-5 px-5 '>
                <div className={`flex justify-start px-5 pb-4 border-b border-gray-50 border-opacity-20 ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    <Text className='font-IBMPlexSans font-semibold text-text-primary'>Main Menu</Text>
                </div>
            </div>
            <div className={`pt-5`}>
                <TreeMenuList list={menu} controller={controller} />

            </div>
        </div>
      </div>

  )
}

export default MainTree