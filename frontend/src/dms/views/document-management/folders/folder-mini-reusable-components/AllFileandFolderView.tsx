import React, { useEffect, useState} from 'react'
import { FlexBox, FlexBoxInner, Text, P, Div } from '../../../../../components/common/StyledComponent'
import Tooltip from '../../../../../iam/components/reusable/Tooltip'
import * as BsIcons  from "react-icons/bs";
import { SiWindows11 } from "react-icons/si";
import Folder from './Folder'
import * as Fa6Icons from 'react-icons/fa6' 
import useFolderAndFileExplorerActions from '../../../../hooks/useFolderAndFileExplorerActions'
import useUtils from '../../../../hooks/useUtils';
import CreateFolderM from '../../modals/CreateFolderM';
import useCreareFolder from '../../../../hooks/useCreareFolder';
import FolderContent from './FolderContent';
import { useSearchFolderQuery } from '../../../../services/folderAPISlice';
import DocumentUploadModal from '../../../files-view/files-modal/DocumentUploadModal';
import { useGetDocumentQuery } from '../../../../services/fileAPISlice';
import useFiles from '../../../../hooks/useFiles';


const AllFileandFolderView = () => {
    const {
        folder_data, 
        openStates,
        setCurrentFolder, 
        setOpenStates, 
        handleBackClick, 
        handleForwardClick, 
        handleFolderDoubleClick,
        currentPath, 
        currentFolder, 
        toggleItem,
        search,
        handleSearchChange,
        isSearching
    } = useFolderAndFileExplorerActions()

    const {data: document} = useGetDocumentQuery()
    const [fileInFolder, setFileInFolder] = useState<string | null>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {open, handleIsOpenCloseMenuModal} = useUtils()
    const {setFolderAttributes, folderAttributes, handleFolderCreationInputChanges} = useCreareFolder()
    const { setUploadDocumentState, uploadDocumentState } = useFiles()

    const {data: searchFolderResult, isSuccess, isError} = useSearchFolderQuery(
        {folder_name: search},
        {skip: !search } 
    )
    
    useEffect(() => {
        if (folder_data && folder_data.length > 0) {
          setCurrentFolder(folder_data);
          setOpenStates(new Array(folder_data.length).fill(false));
        }
      }, [folder_data, setCurrentFolder, setOpenStates]); 

      

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

      const openUploadDocumentModal = () => {
        // Ensure currentFolder is correctly representing the currently displayed folder
        const folder = currentFolder && currentPath.length > 0 
          ? currentPath[currentPath.length - 1].folder_name : "";     
        console.log("Opening modal with parent_folder:", folder);
        setFileInFolder(folder);
        handleIsOpenCloseMenuModal();
      };


    return (
      <FlexBox className="flex flex-col h-full relative bg-white mx-1 font-Poppins">
        <FlexBoxInner className='bg-gray-50'>
          
            <FlexBoxInner className='mx-5 py-3'>
                <Text className='font-semibold text-primary-green text-opacity-95 text-[23px]'>Record Library</Text>
                <P className='text-[9px] text-[#333] text-opacity-65'>Document and any attachment the you made with yoou user account </P>
            </FlexBoxInner>
                          
            <FlexBox className='flex gap-5 justify-between items-center mx-5 py-3'>
                <FlexBoxInner className='flex space-x-1'>
                    <Fa6Icons.FaCircleArrowLeft size={20} onClick={handleBackClick}  /> 
                    <Fa6Icons.FaCircleArrowRight size={20} onClick={handleForwardClick}/>
                </FlexBoxInner>
                <FlexBoxInner className='flex-grow'>
                    <input 
                        className='px-2 py-[7px] text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white rounded-[3px]' 
                        placeholder='Search file and folder'
                        value={search}
                        onChange={handleSearchChange}
                    />
                </FlexBoxInner>
                <FlexBox className='flex space-x-1 cursor-pointer pr-5 p-[5px]'>
                    <FlexBoxInner className='flex justify-center items-center space-x-3 '>
                        <Text className='text-[12px] border px-3 rounded-[3px] hover:bg-gray-200 py-2' onClick={openCreateFolderModal}>Create Folder</Text>
                        <Text className='text-[12px] border px-3 rounded-[3px] hover:bg-gray-200 py-2' onClick={openUploadDocumentModal}>Upload</Text>
                    </FlexBoxInner>
                    <FlexBoxInner className={`w-10 h-10 flex justify-center items-center hover:rounded-full hover:bg-gray-200`}>
                        <Tooltip content={`List View`}>
                            <BsIcons.BsListColumns size={18} color={`#333`}  />
                        </Tooltip>
                    </FlexBoxInner>
                    <FlexBoxInner className={`w-10 h-10 flex justify-center items-center hover:rounded-full hover:bg-gray-200`}>
                        <Tooltip content={`Grid View`}>
                            <SiWindows11 size={18} color={`#1ea1d7`} />
                        </Tooltip>
                    </FlexBoxInner>
                </FlexBox>
            </FlexBox>
        </FlexBoxInner>

        <FlexBox className='border h-full mt-1'>
            <FlexBoxInner className='flex justify-between pt-2 pb-4 pl-6 pr-20 cursor-pointer border-b'>
                <Text className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px]'>Name</Text>
                <Div className='w-12'>
                    <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Size</Text>
                </Div>
                <Div className='flex space-x-5'>
                    <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Size</Text>
                    <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Modified Date</Text>
                </Div>
            </FlexBoxInner>
            
            {
                isSearching ? (
                    // Display search results if searching
                    <FlexBoxInner className='h-full overflow-y-scroll'>
                        {isSuccess && searchFolderResult && searchFolderResult.length > 0 ? (
                        <FolderContent
                            folder_data={searchFolderResult}
                            handleItemClick={handleFolderDoubleClick}
                            openStates={openStates} 
                            toggleItem={toggleItem}
                            handleBackClick={handleBackClick}
                            handleForwardClick={handleForwardClick}
                        />
                        ) : (
                        <p>No folder found with that name</p>
                        )}
                    </FlexBoxInner>
                ) : (
                    // Display normal folder content
                    <>
                        <FlexBoxInner className='h-full overflow-y-scroll'>
                            {
                                currentFolder && currentPath.length > 0 ? (
                                    <FolderContent
                                        folder_data={currentFolder || []} 
                                        handleItemClick={handleFolderDoubleClick}
                                        openStates={openStates} 
                                        toggleItem={toggleItem}
                                        handleBackClick={handleBackClick}
                                        handleForwardClick={handleForwardClick}
                                    />
                                 ) : (
                                    <Div>
                                        <Folder
                                            folder_data={folder_data || []} 
                                            handleItemClick={handleFolderDoubleClick} 
                                            openStates={openStates} 
                                            toggleItem={toggleItem}
                                            handleBackClick={handleBackClick}
                                            handleForwardClick={handleForwardClick}
                                        />

                                    </Div>
                                ) 
                            }
                            
                        </FlexBoxInner>                    
                    </>
                )}

                            
        </FlexBox>    

        <>
            <CreateFolderM 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Create Folder'}
                folderAttributes={folderAttributes}
                handleFolderCreationInputChanges={handleFolderCreationInputChanges}
            />

            <DocumentUploadModal 
                open={open}
                handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                title={`Upload Document`}
                fileInFolder={fileInFolder}
            />

        </>
      </FlexBox>
    );
  
}
  

export default AllFileandFolderView



  //   const openCreateFolderModal = () => {
    //     setFolderAttributes({ parent_folder: currentFolder?.folder_name || "", folder_name: "" });
    //     setIsOpen(prev => !prev);
    //   };





  {/* {
                currentFolder && (
                    <Folder 
                        folder_data={currentFolder || folder_data} 
                        handleItemClick={handleItemClick} 
                        openStates={openStates} 
                        toggleItem={toggleItem}
                        handleBackClick={handleBackClick}
                        handleForwardClick={handleForwardClick}
                
                    />
                )}   */}