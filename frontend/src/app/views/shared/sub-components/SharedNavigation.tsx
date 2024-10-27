import React, { useState } from 'react'
import { FlexBoxInner, Text } from '../../../../iam/components/reusable/StyledComponent'
import { FlexBox, P } from '../../../../components/common/StyledComponent'
import * as BiIcons from "react-icons/bi";
import { shared } from '../../../constants/menu-items/shared';
import useUtils from '../../../hooks/useUtils';
import { BsListColumns } from "react-icons/bs";
import { SiWindows11 } from "react-icons/si";
import Tooltip from '../../../../iam/components/reusable/Tooltip';


const SharedNavigation = () => {

 const {isOpen, handleDropdownToggle, handleIsOpenCloseMenu, activeLabel} = useUtils()


  return (
    <FlexBox className='flex flex-col'>
        <FlexBox className='flex justify-between items-center bg-white bg-opacity-70 pr-20'>
            <Text className='font-semibold px-3 pt-5 pb-3'>Shared File</Text>

            {/* Section for ListView and GridView UI and its logic  */}
            <FlexBox className='flex cursor-pointer pr-5 p-[10px]'>
                <FlexBoxInner className={`w-10 h-10 flex justify-center items-center hover:rounded-full hover:bg-gray-200`}>
                    <Tooltip content={`List View`}>
                        <BsListColumns size={18} color={`#333`}  />
                    </Tooltip>
                </FlexBoxInner>
                <FlexBoxInner className={`w-10 h-10 flex justify-center items-center hover:rounded-full hover:bg-gray-200`}>
                    <Tooltip content={`Grid View`}>
                        <SiWindows11 size={18} color={`#1ea1d7`} />
                    </Tooltip>
                </FlexBoxInner>
            </FlexBox>
        </FlexBox>


        {/* Section for filter capability  */}
        <FlexBox>
            <FlexBoxInner className='flex space-x-3 px-3 pb-3 bg-white'>
                {
                    shared?.map((menuItems, index) => {
                        return(
                        <FlexBox key={index} className={`border border-gray-400 border-opacity-30 flex items-center justify-center space-x-3 cursor-pointer text-[#333] pl-2 ${menuItems.label === activeLabel ? 'bg-[#26cc86] text-white border-[#26cc86]' : null}`} onClick={() => handleDropdownToggle(menuItems.label)}>
                            {
                                menuItems.childern ? (
                                    <FlexBoxInner className='flex justify-between items-center relative w-full py-[4px]'>
                                        <div className={`flex justify-start items-center space-x-1 `}>
                                            <span className=''>{menuItems.icon}</span>
                                            <p className='text-[12px]'>{menuItems.label}</p>
                                        </div>
                                        <span className='pl-3'>{ isOpen[menuItems.label] ? <>{menuItems.iconOpen}</> : <>{menuItems.iconClose}</> }</span>
                                        <FlexBox className={`absolute  top-[1.79rem] -left-[10%] w-[170px] h-[50%] whitespace-nowrap z-50 transition translate-x-0 duration-500 ease-in-out ${menuItems.label === activeLabel ? 'border-t-[2px] border-gray-100' : null}`}>
                                            {
                                                menuItems.childern && isOpen[menuItems.label] &&  (
                                                    <div className=' bg-white border py-2 rounded-[5px] shadow-sm'>
                                                        {
                                                            menuItems.childern && (
                                                                menuItems.childern?.map((childDisplay, index) => {
                                                                    const active = index
                                                                    return(
                                                                        <FlexBoxInner className={`text-sm`} key={index}>
                                                                            <div className='flex space-x-2 px-2 py-2 text-black hover:bg-gray-100' onClick={() => handleIsOpenCloseMenu(childDisplay.abbreviation)}>
                                                                                <aside className='text-[12px] flex items-center space-x-2'>
                                                                                    <span className='text-[16px] pr-2'>
                                                                                        {childDisplay.icon}
                                                                                    </span>
                                                                                    {childDisplay.label}
                                                                                </aside>
                                                                            </div>
                                                                        </FlexBoxInner>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </FlexBox>
                                    </FlexBoxInner>
                                ):(
                                    <FlexBoxInner className='flex justify-between items-center gap-3 pr-1'>
                                        <span>{menuItems.icon}</span>
                                        <P>{menuItems.label}</P>
                                    </FlexBoxInner>
                                )
                            }
                        </FlexBox>
                        ) 
                    } )
                }
            </FlexBoxInner> 

        </FlexBox>
    </FlexBox>
  )
}

export default SharedNavigation