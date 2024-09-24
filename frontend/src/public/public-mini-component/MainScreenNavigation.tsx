import React, { useState } from 'react'
import { main_screen_menu } from './main-screeen-menu'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'



const MainScreenNavigation = () => {
    const [activeLink, setActiveLink] = useState<number>(0)

    const handleActiveLink = (index: number) => {
        setActiveLink(index)
    }

  return (

        <FlexBoxInner className='flex justify-between items-center pr-20 py-2 cursor-pointer shadow-sm'>
            <Text className='font-IBMPlexSans font-semibold px-10  text-primary-green flex space-x-3'>
                <img src={logo}  className='w-14 h-14' />
                <Div className='flex flex-col pt-2'>
                    <Text className='font-Poppins font-normal text-xl text-[#5e2f05]'> Biiroo Lafa Oromiyaa</Text>
                    <Text className='font-Poppins font-normal'> Oromia Land Bureau</Text>

                </Div>
            </Text>
            <Div className='flex'>
                {
                    main_screen_menu?.map((main_menu, index) => {
                        return(
                            <FlexBoxInner className='px-3 py-2 hover:bg-gray-50' key={index} onClick={() => handleActiveLink(index)}>
                                <NavLink 
                                    to={main_menu.path} 
                                    className={`font-Poppins text-[13px] flex space-x-3 items-center`}  
                                    style={({ isActive, isPending }) => {
                                        return {
                                        color: isActive ? "#26cc86" : "inherit",
                                        };
                                    }}
                                    
                                >
                                    <span className='pr-1'>{main_menu.icon}</span>{main_menu.label}
                                </NavLink>
                            </FlexBoxInner>
                        )
                    })
                }
            </Div>
        </FlexBoxInner>
        // ${activeLink === index && 'text-primary-green'}
   
  )
}

export default MainScreenNavigation