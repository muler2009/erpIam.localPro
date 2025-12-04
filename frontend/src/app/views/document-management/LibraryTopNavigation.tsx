import React, { useCallback, useState, useEffect, useRef } from 'react'
import { FlexInnerContainer, FlexBox, P, FlexBoxInner } from '../../../components/common/StyledComponent'
import { library } from '../../constants/menu-items/library'
import { ModalComponent } from './modals'
import { FlexOuterContainer } from '../../../iam/components/reusable/StyledComponent'
import { BsListColumns } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import FileMenu from './folders/FileMenu'
import useUtils from '../../hooks/useUtils'


export const LibraryTopNavigation = () => {

    const {handleDropdownToggle, handleIsOpenCloseMenu, isOpen, activeLabel, setIsOpen, setActiveLabel} = useUtils()
    const location = useLocation()
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    // const isRootPath = location.pathname === '' || location.pathname === '/';W
    {
        location.pathname === '/dms/document/library/main' 
        ? 
            <>
                {
                    IoArrowBackCircle({
                        size:25, 
                        className:"text-gray-400 cursor-not-allowed text-[20px]"

                    })
                }
            </>
        : ( 
            <Link to=''>
                {
                 IoArrowBackCircle({
                     size: 25,
                     className: "text-blue-500 hover:text-blue-700" 
                 })
                }
                </Link>
            )
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (!dropdownRef.current?.contains(event.target ?? null)) {
            handleDropdownToggle('').then(() => {
              setIsOpen({});
              setActiveLabel(null);
            });
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [handleDropdownToggle]);
   


  return (
    <FlexOuterContainer className='flex justify-between items-center bg-[#fff] pr-10 pl-3' ref={dropdownRef}>
        <FlexInnerContainer className='flex items-center pl-10 flex-grow'>
            <FileMenu />
        </FlexInnerContainer>
        <FlexInnerContainer className='flex p-0 space-x-5'>
            {
                library?.map((library, index) => {
                    return(
                    <FlexBox key={index} className={`flex items-center justify-center cursor-pointer text-[#333] pl-2 border rounded-[3px]`} onClick={() => handleDropdownToggle(library.label)}>
                        {
                            library.childern ? (
                                <FlexBoxInner className='flex justify-between items-center relative w-full py-[8px]'>
                                    <div className={`flex justify-start items-center space-x-2 ${library.label === activeLabel ? 'text-[#26cc86]' : null}`}>
                                        <span className=''>{library.icon}</span>
                                        <p className='text-[12px]'>{library.label}</p>
                                    </div>
                                    <span className='pl-3'>{ isOpen[library.label] ? <>{library.iconOpen}</> : <>{library.iconClose}</> }</span>
                                    <FlexBox className={`absolute top-8 -right-[12%] w-[250px] mt-2 whitespace-nowrap z-50 bg-[#fefefe]`}>
                                        {
                                            library.childern && isOpen[library.label] &&  (
                                                <div className=' bg-[#f2f2f2] border py-2'>
                                                    {
                                                        library.childern && (
                                                            library.childern?.map((childDisplay, index) => {
                                                                const active = index
                                                                return(
                                                                    <FlexBoxInner className={`text-sm`} key={index}>
                                                                        <div className='flex space-x-2 px-2 py-1 hover:bg-blue-800 hover:text-white ' onClick={() => handleIsOpenCloseMenu(childDisplay.abbreviation)}>
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
                                    <span>{library.icon}</span>
                                    <P>{library.label}</P>
                                </FlexBoxInner>
                            )
                        }
                    </FlexBox>
                    ) 
                } )
            }
        </FlexInnerContainer>
        {/* <FlexInnerContainer className='flex space-x-3 cursor-pointer pr-5 p-[10px]'>
          
            <BsListColumns size={20} color={`#333`}  />
            <SiWindows11 size={20} color={`#1ea1d7`} />
        </FlexInnerContainer> */}
            {/* display the respective modal based on their name  */}
            <>
                { 
                    library?.map(library => (
                        library.childern?.map(child => (
                            <ModalComponent
                                isOpen={isOpen[child.abbreviation]}
                                handleIsOpenCloseMenu={() => setIsOpen(prevState => ({ ...prevState, [child.abbreviation]: false }))}
                                title={child.label}
                                abbreviation={child.abbreviation}
                            />
                          ))
                    ))
                }
            </>
    </FlexOuterContainer>
  )
}
