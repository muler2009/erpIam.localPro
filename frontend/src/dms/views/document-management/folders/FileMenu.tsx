import React, {useState, useEffect, useRef} from 'react'
import { FlexOuterContainer, FlexBoxInner, FlexBox, Text } from '../../../../components/common/StyledComponent'
import { file_menu } from '../../../constants/menu-items/fileMenus'
import { Link } from 'react-router-dom'
import useUtils from '../../../hooks/useUtils'

const FileMenu = () => {
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const {handleDropdownToggle, handleIsOpenCloseMenu, isOpen, activeLabel, setIsOpen, setActiveLabel} = useUtils()

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
    <FlexOuterContainer className='flex items-center space-x-2 cursor-pointer' ref={dropdownRef}>
        {
            file_menu?.map((file_menu, index) => {
               return(
                <div className='text-sm' key={index} onClick={() => handleDropdownToggle(file_menu.label)}>
                    {
                        file_menu.childern ? (
                            <FlexBoxInner className='flex justify-between items-center relative w-full'>
                              <div className={`flex justify-start items-center space-x-2`}>
                                    {/* <span className=''>{file_menu.icon}</span> */}
                                    <p className='text-[12px]'>{file_menu.label}</p>
                                </div>
                                <span className='pl-3'>{ isOpen[file_menu.label] ? <>{file_menu.iconOpen}</> : <>{file_menu.iconClose}</> }</span>
                                <FlexBox className={`absolute top-8 -left-[7%] w-[250px] mt-2 whitespace-nowrap z-50 ${file_menu.label === activeLabel ? 'border-t-[2px] border-gray-100' : null}`}> 
                                    {
                                        file_menu.childern && isOpen[file_menu.label] && (
                                            <div className=' bg-[#f2f2f2] border py-2'>
                                                {
                                                    file_menu.childern && (
                                                        file_menu.childern?.map((childDisplay, index) => {
                                                            return(
                                                                <FlexBoxInner 
                                                                    className={`text-sm relative `} 
                                                                    key={index} 
                                                                    onMouseEnter={() => handleDropdownToggle(childDisplay.label)} 
                                                                    onMouseLeave={() => handleDropdownToggle(childDisplay.label)}
                                                                >
                                                                    <div className='flex justify-between items-center space-x-2 px-1 py-1 hover:bg-blue-800 hover:text-white border-b border-opacity-90 ' >
                                                                        <aside className='text-[12px] flex items-center space-x-2'>
                                                                            <span className='text-[16px] pr-2'>{childDisplay.icon}</span>
                                                                            {childDisplay.label}
                                                                        </aside>
                                                                        <span className='text-[13px]'>{ isOpen[childDisplay.label] ? <>{childDisplay.iconOpen}</> : <>{childDisplay.iconClose}</> }</span>
                                                                    </div>
                                                                    <FlexBox className={`absolute -top-2 bg-white left-[100%] w-[150px] mt-2 ml-[2px] whitespace-nowrap z-50 ${childDisplay.label === activeLabel ? 'border-t-[2px] border-gray-100' : null}`}>
                                                                        {
                                                                            childDisplay.childern && isOpen[childDisplay.label] && (
                                                                                <div className='flex flex-col'>
                                                                                    {
                                                                                        childDisplay.childern && (
                                                                                            childDisplay?.childern?.map((child, index) => {
                                                                                                return(
                                                                                                    <div key={index} className='flex space-x-2 px-2 py-1 hover:bg-blue-800 hover:text-white ' onClick={() => handleIsOpenCloseMenu(child.label)}>
                                                                                                       
                                                                                                        <Link className='text-[12px] flex items-center space-x-2'  to={child.path || ""}>
                                                                                                            <span className='text-[16px] pr-2'>
                                                                                                                {child.icon}
                                                                                                            </span>
                                                                                                            {child.label}
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            )

                                                                        }
                                                                    </FlexBox>
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

                        ): (
                            <FlexBoxInner className='text-[12px]'>
                                <Link to={file_menu.path || ""}>
                                    {file_menu.label}
                                </Link>
                            </FlexBoxInner>
                        )
                    }
                </div>
               )
            })
        }
    </FlexOuterContainer>
  )
}

export default FileMenu




// file_menu?.childern.map((child_menu, index) => {
//     return(
//         <FlexBoxInner className='' key={index}>
//             {
//                 child_menu.children ? (
//                     <FlexBoxInner>
//                         <div className={`flex justify-start items-center space-x-2`}>
//                             <p className='text-[12px]'>{child_menu.label}</p>
//                         </div>
//                         <FlexBox className={`absolute top-9 -left-[7%] w-[250px] mt-2 whitespace-nowrap z-50`}>
//                             {
//                                 child_menu?.children.map((child, index) => {
//                                     return(
//                                         <div className=''>
//                                             <Link to={child.path || ""}>
//                                                 {child.label}
//                                             </Link>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </FlexBox>
//                     </FlexBoxInner>

//                 ):(
//                     <div className=''>
//                             asdsad
//                     </div>
//                 )

//             }

//         </FlexBoxInner>
//     )
// })