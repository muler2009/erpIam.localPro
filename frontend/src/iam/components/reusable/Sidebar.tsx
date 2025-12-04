import React,{ useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { sidebarItems } from '../../views/managment/constants/iam-menu-items/sidebar'
import { Submenu } from '.'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import Tooltip from './Tooltip'
import TreeView from './TreeView'
import menus from '../../constants/data'
import * as MdIcons from "react-icons/md";

const SideBar = () => {

const [active, setActive] = useState(null)
const [controller, setController] = useState<boolean>(true) // a temporary state for handling the collapsable menu
const handleActiveLink = useCallback((index : any) => {
    setActive(index)
  }, [])

const handleOpenCloseSideBar = useCallback(() => {setController(prev => ! prev)}, [controller])
   
  return (
    <div className={`font-IBMPlexSans flex flex-col h-[96vh] shadow-md z-0 cursor-pointer overflow-x-hidden bg-[#ffffff] ${!controller ? 'w-[70px] bg-[#ffffff] text-white' : 'w-[22rem] bg-[#f9f9f9]'}`}>
        <div className={`relative `}>
            <div className={` ${controller ? 'flex justify-between items-center pr-5 text-black' : 'block pt-5'  } `}>
                <div className={`pb-[3px] ${!controller ? 'hidden': 'flex' }`}>
                    <div className='px-10 flex items-center flex-grow py-2 space-x-1 '>
                        
                        <Tooltip content={`Identity and Access Management`}>
                            <h1 className='font-Poppins text-black text-[25px] font-semibold'>
                                IDAMSs<span className='font-Poppins text-[20px] text-[#05d876] font-semibold'></span>
                            </h1>

                        </Tooltip>
                    </div>
                </div>
                <div className={` flex justify-center items-center text-[#333]`}>
                    {
                        !controller
                        ? (
                            <div className='shadow-md '>
                                {
                                    MdIcons.MdMenu({
                                        size:25,
                                        onClick: handleOpenCloseSideBar

                                    }) 
                                }
                                
                            </div>
                        ) : (
                            <div className='shadow-sm '>
                                  {
                                    MdIcons.MdMenu({
                                        size:25,
                                        onClick: handleOpenCloseSideBar

                                    }) 
                                }
                            </div>
                        ) 
                    }
                </div>
            </div>
        
            <div className='flex flex-col py-4 text-black mt-10 '>
                {
                    sidebarItems?.map((sideParent, index) => {
                        return <Submenu key={index} sideParent={sideParent} controller={controller} handleActiveLink={handleActiveLink} />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default SideBar


