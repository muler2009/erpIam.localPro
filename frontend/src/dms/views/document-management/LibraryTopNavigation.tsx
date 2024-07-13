import React, { useCallback, useState } from 'react'
import { FlexInnerContainer, FlexBox, P, FlexBoxInner } from '../../../components/common/StyledComponent'
import { library } from '../../constants/library'
import { ModalComponent } from './modals'
import { FlexOuterContainer } from '../../../iam/components/reusable/StyledComponent'
import { BsListColumns } from "react-icons/bs";
import { SiWindows11 } from "react-icons/si";


export const LibraryTopNavigation = () => {

    const [isOpen, setIsOpen] = useState<{[key: string]: boolean}>({})     
    const [activeLabel, setActiveLabel] = useState<string | null>(null);


    const handleIsOpenCloseMenu = (label: string) => {
        setIsOpen(prevState => ({
          ...prevState,
          [label]: !prevState[label],
        }));
      };

    const handleDropdownToggle = (label: string) => {
        setIsOpen(prevState => {
            const newOpenState: { [key: string]: boolean } = {};
            
            // Close all other menu items
            library.forEach(item => {
              if (item.label !== label) {
                newOpenState[item.label] = false;
              }
            });
        
            // Toggle the selected menu item
            newOpenState[label] = !prevState[label];
            setActiveLabel(prevState[label] ? null : label);
        
            return {
              ...prevState,
              ...newOpenState,
            };
          });
    };

  return (
    <FlexOuterContainer className='flex justify-between items-center bg-[#fff] pr-10'>
        <FlexInnerContainer className='flex p-0'>
            {
                library?.map((library, index) => {
                    return(
                    <FlexBox key={index} className={`flex items-center justify-center cursor-pointer text-[#333] pl-2 `} onClick={() => handleDropdownToggle(library.label)}>
                        
                        {
                            library.childern ? (
                                <FlexBoxInner className='flex justify-between items-center relative w-full py-[8px]'>
                                    <div className={`flex justify-start items-center space-x-2 ${library.label === activeLabel ? 'text-[#26cc86]' : null}`}>
                                        <span className=''>{library.icon}</span>
                                        <p className='text-[12px]'>{library.label}</p>
                                    </div>
                                    <span className='pl-5'>{ isOpen[library.label] ? <>{library.iconOpen}</> : <>{library.iconClose}</> }</span>
                                    <FlexBox className={`absolute top-9 -left-[7%] w-[250px] mt-2 whitespace-nowrap z-50 ${library.label === activeLabel ? 'border-t-[2px] border-gray-100' : null}`}>
                                        {
                                            library.childern && isOpen[library.label] &&  (
                                                <div className=' bg-white border py-2'>
                                                    {
                                                        library.childern && (
                                                            library.childern?.map((childDisplay, index) => {
                                                                const active = index
                                                                return(
                                                                    <FlexBoxInner className={`text-sm`} key={index}>
                                                                        <div className='flex space-x-2 hover:bg-gray-100 px-2 py-1' onClick={() => handleIsOpenCloseMenu(childDisplay.abbreviation)}>
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
        <FlexInnerContainer className='flex space-x-3 cursor-pointer pr-5 p-[10px]'>
            <BsListColumns size={20} color={`#333`}  />
            <SiWindows11 size={20} color={`#1ea1d7`} />
        </FlexInnerContainer>
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
