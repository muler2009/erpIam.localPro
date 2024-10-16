import React, { useState, useCallback } from 'react'
import * as MdIcons from 'react-icons/md'
import TreeMenuList from './TreeMenuList'
import { TreeMenuItemInterface } from './tree-menu-interface'
import BottomTooltip from '../../../../components/common/BottomTooltip'
import { useSelector } from 'react-redux'
import { username } from '../../../api/auth' 
import { FlexBox, Text } from '../StyledComponent'

interface SideMenuInterface {
  menu: TreeMenuItemInterface[] | undefined
}

const MainTree = ({menu = []}: SideMenuInterface) => {

  const [controller, setController] = useState<boolean>(true)
  const handleOpenCloseSideBar = useCallback(() => {setController(prev => ! prev)}, [])
  const loggedUser = useSelector(username)

  return (
      <div className={`font-IBMPlexSans flex flex-col h-[100vh] border-t border-b border-gray-100 border-opacity-40 shadow-md z-10 cursor-pointer overflow-x-hidden text-white ${controller ? 'w-[22rem] bg-[#232e31]': 'w-[70px] bg-[#232e31] text-white'}`}>
        <div className={`relative pt-5 px-1`}>
            <div className={`${controller ? 'flex justify-between items-center pr-5 text-black border-b border-gray-50 border-opacity-20' : 'block pt-5'  } `}>
                <div className={`pb-[3px] ${!controller ? 'hidden': 'flex' }`}>
                    <div className='px-10 flex items-center flex-grow py-2 space-x-1 '>                      
                        <Text className='font-Poppins text-black text-[25px] font-semibold'>
                            <span className='font-Poppins text-[20px] text-[#05d876] font-semibold'>{loggedUser}</span>
                        </Text>                       
                    </div>
                </div>
                <div className={` flex justify-center items-center text-[#fff]`}>
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

            <div className='flex flex-col py-4 text-black mt-5'>
                <FlexBox className={`flex justify-start pl-10 pb-4  ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    <Text className='font-IBMPlexSans font-semibold text-white text-opacity-65'>Main Menu</Text>
                </FlexBox>
              <TreeMenuList list={menu} controller={controller} />
            </div>
        </div>
      </div>

  )
}

export default MainTree