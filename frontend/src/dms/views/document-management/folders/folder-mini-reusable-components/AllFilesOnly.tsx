import React, {useEffect, useRef, useState} from 'react'
import { FlexBox, FlexBoxInner, Text, Div, P } from '../../../../../components/common/StyledComponent';
import * as TfiIcons from "react-icons/tfi";
import * as RxIcons from "react-icons/rx";
import * as IoIcons from 'react-icons/io5'
import GetAllDocument from '../../../files-view/GetAllDocument';
import useUtils from '../../../../hooks/useUtils';
import { sort_menu } from '../../../../constants/menu-items/fileMenus';
import { BiSort } from "react-icons/bi";
import DocumentUploadModal from '../../../files-view/files-modal/DocumentUploadModal';
import { Link } from 'react-router-dom';
import BottomTooltip from '../../../../../components/common/BottomTooltip';


const AllFilesOnly = () => {
    const {dropdown, handledropdownMenu, handleIsOpenCloseMenuModal, open} = useUtils()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [fileInFolder, setFileInFolder] = useState<string | null>('')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            handledropdownMenu(); // Close the dropdown
          }
        };
    
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        // Cleanup the event listener on component unmount
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <FlexBox className="flex flex-col h-full relative bg-white mx-1 font-Poppins">
          <FlexBoxInner className='bg-gray-50'>
            
              <FlexBoxInner className='mx-5 py-3'>
                  <Text className='font-semibold text-primary-green text-opacity-95 text-[23px]'>File Library</Text>
                  <p className='text-[11px] text-[#333] text-opacity-65'>Document and any attachment the you made with yoou user account </p>
              </FlexBoxInner>
                            
              <FlexBox className='flex  justify-start items-center mx-1 shadow-sm py-2 divide-x-[1px] bg-white'>
                <Link className='px-2 cursor-pointer z-10' to="../">
                    <BottomTooltip content='Back to Home'>
                        <IoIcons.IoChevronBackOutline />
                    </BottomTooltip> 
                </Link>

                {/* filter drop down in the file */}
                <Div className='relative px-2'>
                    <Text className='text-sm flex px-2 py-2 items-center cursor-pointer text-[12px] hover:bg-gray-100' onClick={handledropdownMenu}>
                        <span><BiSort /></span>Sort Files
                        <span className='pl-3'>
                            { dropdown ? <RxIcons.RxCaretUp/> : <RxIcons.RxCaretDown /> }
                        </span>
                    </Text>
                    
                    {dropdown && (
                        <FlexBox ref={dropdownRef}  className='absolute bg-white top-[2.75em] border w-[200px] transition-opacity duration-200 rounded-[3px] py-3 z-50 mt-[2px]'>
                            {sort_menu?.map((sort, index) => (
                                <FlexBoxInner className='flex items-center py-2 hover:bg-gray-50 cursor-pointer px-5' key={index}>
                                    <label className='flex items-center space-x-2 text-nowrap '>
                                        <input
                                            type='radio'
                                            className='w-4 h-4 accent-red-500 cursor-pointer' // Adjusted size
                                        />
                                        <Text className='text-[12px] text-[#333]'>{sort.label}</Text> {/* Use Text component for consistency */}
                                    </label>
                                </FlexBoxInner>
                            ))}
                        </FlexBox>
                    )}
                    
                </Div>
                <Div className='cursor-pointer pl-2' onClick={handleIsOpenCloseMenuModal}>
                    <Text className='text-[12px] px-3 rounded-[3px] py-2 flex items-center hover:bg-gray-100 '>
                        <TfiIcons.TfiUpload size={18} className='pr-[5px]' />
                        Upload File
                    </Text>      

                </Div>

                <Div className='flex-grow ml-5'>
                    <input 
                        className='px-2 py-[7px] text-[12px] font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white rounded-[3px]' 
                        placeholder='Search file'
                        
                    />
                </Div>
        
              </FlexBox>
          </FlexBoxInner>
  
          <FlexBox className='border h-full mt-1'>
              <FlexBoxInner className='flex justify-between pt-2 pb-4 pl-6 pr-20 cursor-pointer border-b'>
                  <Text className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px]'>Name</Text>
                 
                  <Div className='flex space-x-5'>
                      <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Size</Text>
                      <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Modified Date</Text>
                  </Div>
              </FlexBoxInner>

              <GetAllDocument />
              
            </FlexBox>    
  
           
            <DocumentUploadModal 
                open={open}
                handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                title={`Upload Document`}
                fileInFolder={fileInFolder}
            />
          
        </FlexBox>
      );
}

export default AllFilesOnly