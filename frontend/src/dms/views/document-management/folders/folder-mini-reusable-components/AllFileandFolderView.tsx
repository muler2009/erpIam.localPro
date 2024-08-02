import React, { useEffect, useState} from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent'
import Tooltip from '../../../../../iam/components/reusable/Tooltip'
import { BsListColumns } from "react-icons/bs";
import { SiWindows11 } from "react-icons/si";
import Folder from './Folder'

import * as Fa6Icons from 'react-icons/fa6' 


import useFolderAndFileExplorerActions from '../../../../hooks/useFolderAndFileExplorerActions'
import { InputWithDesc } from '../../../../../iam/components/reusable';
import { Input } from '../../../../../components/common';
import { FolderDataInterface } from '../../../../models/folder-models';
import useUtils from '../../../../hooks/useUtils';
import { CreateFolder } from '../../modals';
import CreateFolderM from '../../modals/CreateFolderM';
import useCreareFolder from '../../../../hooks/useCreareFolder';


const AllFileandFolderView = () => {

    const {
        folder_data, 
        openStates,
        setCurrentFolder, 
        setOpenStates, 
        handleBackClick, 
        handleForwardClick, 
        handleItemClick,
        currentPath, 
        forwardStack, 
        currentFolder, 
        toggleItem,
        getLastPathName
    } = useFolderAndFileExplorerActions()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {setFolderAttributes, folderAttributes, handleFolderCreationInputChanges} = useCreareFolder()
    
    useEffect(() => {
        if (folder_data) {
          setCurrentFolder(folder_data);
          setOpenStates(new Array(folder_data.length).fill(false));
        }
      }, [folder_data, setCurrentFolder, setOpenStates]); 

    //   const openCreateFolderModal = () => {
    //     setFolderAttributes({ parent_folder: currentFolder?.folder_name || "", folder_name: "" });
    //     setIsOpen(prev => !prev);
    //   };

    const openCreateFolderModal = () => {
        // Ensure currentFolder is correctly representing the currently displayed folder
        const parent_folder = currentFolder && currentPath.length > 0 
          ? currentPath[currentPath.length - 1].folder_identifier : "";
      
        console.log("Opening modal with parent_folder:", parent_folder);
      
        setFolderAttributes(prevState => ({
            ...prevState,
            parent_folder: parent_folder
          }));
        setIsOpen(true);
      };

    return (
      <FlexBox className="flex flex-col h-full relative">
        <FlexBox className='flex gap-5 justify-between items-center pt-2 pb-2 sticky top-0 '>
            <FlexBoxInner className='flex space-x-1'>
                <Fa6Icons.FaCircleArrowLeft size={20} onClick={handleBackClick}  /> 
                <Fa6Icons.FaCircleArrowRight size={20} onClick={handleForwardClick}/>
            </FlexBoxInner>
            <FlexBoxInner className='flex-grow'>
               {/* <Input 
                    placeholder='Search here'
                    name='search'
                    type='text'
                    id='search_input'
                    className='input-md'
               
               /> */}
            </FlexBoxInner>
            <FlexBox className='flex space-x-1 cursor-pointer pr-5 p-[5px]'>
                <FlexBox className='flex justify-center items-center space-x-3 '>
                    <Text className=' text-[12px] border px-3 rounded-md hover:bg-gray-200 py-2' onClick={openCreateFolderModal}>Create Folder</Text>
                    <Text className='text-[12px] border px-3 rounded-md hover:bg-gray-200 py-2' onClick={openCreateFolderModal}>Upload</Text>
                
                </FlexBox>
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

       
        <FlexBoxInner className='h-full overflow-y-scroll'>
            {
                currentFolder && (
                    <Folder 
                        folder_data={currentFolder} 
                        handleItemClick={handleItemClick} 
                        openStates={openStates} 
                        toggleItem={toggleItem}
                        handleBackClick={handleBackClick}
                        handleForwardClick={handleForwardClick}
                
                    />
                )}
        </FlexBoxInner> 

        <>
           
                    <CreateFolderM 
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        title={'Create Folder'}
                        folderAttributes={folderAttributes}
                        handleFolderCreationInputChanges={handleFolderCreationInputChanges}

                    
                    />
            
        </>
    
      </FlexBox>
    );
  
}
  

export default AllFileandFolderView