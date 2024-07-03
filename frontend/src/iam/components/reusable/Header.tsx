import React, {useState} from 'react'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import * as RxIcons from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { iconNotify, dropdownItems } from '../../constants/dropdown'
import Tooltip from './Tooltip'
import { Input } from '../../../components/common'
import useLogout from '../../../auth/logout/useLogout'


const Header = () => {

    const [drop, setDrop] = useState<boolean>(false)
    const { onUserLogoutClicked } = useLogout()


  return (
    <header className='bg-green-400 border-b border-[#333] border-opacity-20 sticky text-white z-50'>
        <nav className='flex justify-between items-center text-[#000] py-2'>
            <div className=''>
                <h1 className='font-Poppins text-sm pl-5'>Dashboard</h1>
            </div>
            {/* <div className='flex-grow px-10'>
                <input 
                    type='text'
                    placeholder='Search anything here'
                    className='input-md bg-[#fff] font-Poppins text-[13px]'        
                />
            </div> */}
            <div className='flex space-x-4 bg-inherit '>
                <div className='flex space-x-5 pl-4 text-[20px] cursor-pointer'>
                    {
                        iconNotify?.map((icon_notify, index) => {
                            return(
                                <div className='w-10 h-10 rounded-full shadow-md flex justify-center items-center text-[16px] ' key={index}>
                                    <Tooltip content={icon_notify.content}>
                                        {
                                            icon_notify?.bool ? (
                                                <Link to={icon_notify.path || ""}>{icon_notify.icons}</Link>
                                            ): (
                                                <div className=''>
                                                    {icon_notify.icons}
                                                </div>
                                            )
                                        }  
                                    </Tooltip>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col gap-0 cursor-pointer pr-4' onClick={() => setDrop(prev => !prev)}>
                    <span className='text-white font-Poppins text-[13px] flex flex-col items-start justify-center'>User</span>
                    <div className={`text-white flex space-x-1`}>
                        <h6 className='font-Rubik text-sm leading-4 font-bold flex items-center space-x-5'>Account</h6>
                        <span>
                            { drop ? <MdIcons.MdArrowDropUp size={20} /> : <MdIcons.MdArrowDropDown size={20} /> } 

                        </span>
                    </div>

                    
                    <div className='absolute  bg-white top-full mt-1 right-2 whitespace-nowrap w-[15%] z-50'>
                        {
                            drop && (
                                <div className='relative shadow-md text-black flex flex-col gap-1 pt-0 pb-5 border'>
                                    
                                    {
                                        dropdownItems?.map((dropdown, index) => {
                                            if(dropdown.label === 'Logout'){
                                                return (
                                                    <div className='font-Poppins py-2 text-[13px] flex justify-start items-center space-x-3 px-3 hover:bg-[#f5f3f3]' key={index} onClick={onUserLogoutClicked}>
                                                        <span className='mr-2'>{dropdown.icon}</span>
                                                        {dropdown.label}
                                                    </div>
                                                );
                                            } else {

                                                return(
                                                    <Link to={dropdown.path || ""} className='font-Poppins py-2 text-[13px] flex justify-start items-center space-x-3 px-3 hover:bg-[#f5f3f3]' key={index} >
                                                        <span className='mr-2'>{dropdown.icon}</span>
                                                        {dropdown.label}
                                                    </Link>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
