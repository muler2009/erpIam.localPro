import React,{ useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { sidebarItems } from '../../submodules/managment/constants/iam-menu-items/sidebar'
import { Submenu } from '.'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import Tooltip from './Tooltip'
import TreeView from './TreeView'
import menus from '../../constants/data'

const SideBar = () => {

const [active, setActive] = useState(null)
const [controller, setController] = useState<boolean>(true) // a temporary state for handling the collapsable menu
const handleActiveLink = useCallback((index : any) => {
    setActive(index)
  }, [])

const handleOpenCloseSideBar = useCallback(() => {setController(prev => ! prev)}, [controller])
   
  return (
    <div className={`font-Poppins flex flex-col h-[96vh] shadow-md z-0 cursor-pointer overflow-x-hidden bg-[#ffffff] ${!controller ? 'w-[70px] bg-[#ffffff] text-white' : 'w-[25rem] bg-[#f9f9f9]'}`}>
        <div className={`relative `}>
            <div className={` ${controller ? 'bg-[#131921] flex justify-between items-center pr-5 text-white' : 'block pt-5'  } `}>
                <div className={`bg-[#131921] pb-[3px] ${!controller ? 'hidden': 'flex' }`}>
                    <div className='px-10 bg-[#131921] flex items-center flex-grow py-2 space-x-1 '>
                        <Link to="/erp"> 
                            <AiIcons.AiFillAppstore size={25} color='#05d876' />
                        </Link>
                        <Tooltip content={`Identity and Access Management`}>
                            <h1 className='font-Poppins text-[#fff] text-[25px] font-semibold'>
                                IDAMSs<span className='font-Poppins text-[20px] text-[#05d876] font-semibold'></span>
                            </h1>

                        </Tooltip>
                    </div>
                </div>
                <div className={` flex justify-center items-center ${!controller ? 'text-[25px] text-[#333]' : 'text-[#fff] text-[18px] flex justify-center items-center' }`}>
                    {
                        !controller
                        ? <BiIcons.BiLinkAlt onClick={handleOpenCloseSideBar}/>
                        : <AiIcons.AiOutlineBars onClick={handleOpenCloseSideBar} />
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


