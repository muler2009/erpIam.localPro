import React, {useState, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { iconNotify, dropdownItems } from '../../constants/dropdown'
import Tooltip from './Tooltip'
import { Input } from '../../../components/common'
import useLogout from '../../auth/logout/useLogout'
import { FlexBox, Text } from './StyledComponent'
import { useSelector } from 'react-redux'
import { username } from '../../api/auth'
import { headerAvatorMenus, headerIconsMenus } from '../../constants/menu-items/header-items'
import BottomTooltip from '../../../components/common/BottomTooltip'
import userphoto from '../../../assets/images/user-picture.png'
import { findLabelByPath } from '../../helpers/findLabel'
import { sidebarItems } from '../../views/managment/constants/iam-menu-items/sidebar'



const Header = () => {

    const [drop, setDrop] = useState<boolean>(false)
    const { onUserLogoutClicked } = useLogout()
    const user = useSelector(username)
    const location = useLocation();

    // Get the current path
    const currentPath = location.pathname.split('/').pop(); // Get the last part of the path (e.g., "request" or "requested-sent")

    // Memoize the label for performance
    const currentLabel = useMemo(() => findLabelByPath(sidebarItems, currentPath || ''), [currentPath]);



  return (
    <header className='bg-gray-100 border-b border-[#333] border-opacity-20 sticky top-0 text-[#333] z-50 '>
        <nav className='flex justify-between items-center text-[#000] py-2'>
            <div className=''>
                <h1 className='font-Poppins text-sm pl-5'>{currentLabel ? currentLabel : "Dashboard"}</h1>
            </div>
            <FlexBox className='flex space-x-4 bg-inherit '>
                <div className='flex items-center justify-center pl-4 text-[20px] text-[#333] text-opacity-75 cursor-pointer'>
                    {
                        headerIconsMenus?.map((icon_notify, index) => {
                            return(
                                <div className='w-10 h-10 hover:rounded-full hover:bg-gray-200 flex justify-center items-center text-[20px]' key={index}>
                                    <BottomTooltip content={`${icon_notify.label}`}>
                                        {icon_notify.icon}
                                    </BottomTooltip>
                                </div>
                            )
                        })
                    }
                </div>


                <div className='flex gap-0 cursor-pointer pr-6' onClick={() => setDrop(prev => !prev)}>
                    <div className={`text-[#333] flex space-x-1`}>
                        <Text className='font-Poppins text-[13px] leading-4 flex items-center space-x-6'>
                            <img src={userphoto} alt='User profile picture' className='w-7 h-7 ring-2 ring-text-primary rounded-full object-cover object-center' />
                            {/* <span className='flex items-baseline'>{ drop ? <MdIcons.MdArrowDropUp size={20} /> : <MdIcons.MdArrowDropDown size={20} /> }</span> */}
                        </Text>
                    </div>

                    <div className='absolute  bg-white top-full mt-1 right-2 whitespace-nowrap w-[200px] z-50'>
                        {
                            drop && (
                                <div className='relative shadow-md text-black flex flex-col gap-1 pt-0 pb-5 border'>
                                    
                                    {
                                        headerAvatorMenus?.map((dropdown, index) => {
                                            if(dropdown.label === 'Logout'){
                                                return (
                                                    <div className='font-Poppins py-2 text-[13px] flex justify-start items-center space-x-3 px-3 hover:bg-[#f5f3f3]' key={index} onClick={onUserLogoutClicked}>
                                                        <span className='mr-2'>{dropdown.icon}</span>
                                                        {dropdown.label}
                                                    </div>
                                                );
                                            } else {

                                                return(
                                                    <Link to={dropdown.path || ""} className='font-Poppins py-2 text-[13px] flex justify-start items-center border-b space-x-3 px-3 hover:bg-[#f5f3f3]' key={index} >
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
            </FlexBox>
        </nav>
    </header>
  )
}

export default Header
