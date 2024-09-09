import React, {useState} from 'react'
import { useGetAllRolesQuery } from '../../../../../iam/features/roleAPI';
import { FolderDataInterface, UploadedDocumentInterface } from '../../../../models/folder-models';
import { FlexBox, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent';
import useFolderExplorerActions from '../../../../hooks/useFolderExplorerActions';
import { FaFilePdf } from 'react-icons/fa';
import PdfReader from '../../../../components/common/PDFReader';
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { useGetFolderQuery } from '../../../../services/folderAPISlice';
import * as Fa6Icons from 'react-icons/fa6' 
import { BsFiletypePdf } from "react-icons/bs";
import useFolderAndFileExplorerActions from '../../../../hooks/useFolderAndFileExplorerActions';


interface FolderProps {
  folder_data: FolderDataInterface[];
  handleItemClick: (folder: any) => void;
  openStates: boolean[];
  toggleItem: (index: number) => void;
  handleForwardClick: () => void;
  handleBackClick: () => void;
  
}
interface FolderContentProps {
  folder_data: FolderDataInterface[];
  handleItemClick: (folder: FolderDataInterface) => void;
}

const FolderContent = ({ folder_data, handleItemClick, openStates, toggleItem, handleBackClick, handleForwardClick }: FolderProps) => {
  if (!folder_data || folder_data.length === 0) return null;

  return (
    
    <FlexBoxInner className='flex flex-col relative mx-1'>
        {
            folder_data.map((item, index) => (
                <React.Fragment key={item.folder_identifier}>
                    {/* Display folders */}
                    {
                        item.folder_name && (
                            <div className="mx-5 border-b hover:bg-gray-100 cursor-pointer" onDoubleClick={() => handleItemClick(item)}>
                                <FlexBox className='flex justify-between items-center py-[5px] pr-10'>
                                
                                    <FlexBoxInner className='flex items-center space-x-4 cursor-pointer'>
                                        <AiFillFolder size={50} color='#f8d775' />
                                        <Text className='text-[#333] text-[12px] whitespace-pre-wrap text-nowrap text-center'>
                                            {item.folder_name}
                                        </Text>
                                    </FlexBoxInner>
                                
                                    <FlexBox className='flex justify-start'>
                                        <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>
                                            {item.subfolder?.length} items
                                        </Text>
                                    </FlexBox>
                                    <FlexBox>
                                        <FlexBoxInner className='flex space-x-5'>
                                            <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Size</Text>
                                            <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Modified Date</Text>
                                        </FlexBoxInner>
                                    </FlexBox>
                                </FlexBox>
                                {/* Render subfolders recursively */}
                                {/* {item.subfolder && item.subfolder.length > 0 && (
                                    <FolderContent
                                        folder_data={item.subfolder}
                                        handleItemClick={handleItemClick}
                                        openStates={openStates}
                                        toggleItem={toggleItem}
                                        handleBackClick={handleBackClick}
                                        handleForwardClick={handleForwardClick}
                                    />
                                )} */}
                            </div>
                        )}

                    {/* Display files */}
                    {Array.isArray(item.uploaded_file) && item.uploaded_file.length > 0 && (
                        item.uploaded_file.map(file => (
                            <FlexBox className='w-20 h-20' key={file.document_id}>
                                <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
                                    <BsFiletypePdf size={60} color='#ff4d4d' />
                                    <Text className='text-[#333] text-[12px] whitespace-pre-wrap break-words w-[100px] text-center'>
                                        {file.document_name}
                                    </Text>
                                </FlexBoxInner>
                            </FlexBox>
                        ))
                    )}
                </React.Fragment>
            ))
        }
</FlexBoxInner>
  );
};


export default FolderContent




















  // <FlexBoxInner className='flex space-x-5 flex-wrap'>
    //   {folder_data.map((item, index) => (
    //     <React.Fragment key={item.folder_identifier}>
    //       {item.folder_name ? (
    //         <div className="folder-container">
    //           <FlexBox className='w-20 h-20' onDoubleClick={() => handleItemClick(item)}>
    //             <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
    //               <AiFillFolder size={60} color='#f8d775' />
    //               <Text className='text-[#333] text-[12px] whitespace-pre-wrap break-words w-[100px] text-center'>
    //                 {item.folder_name}
    //               </Text>
    //             </FlexBoxInner>
    //           </FlexBox>
              
    //           {
    //             item.subfolder && item.subfolder.length > 0 ? (
    //               <FolderContent 
    //                 folder_data={item.subfolder} 
    //                 openStates={openStates} 
    //                 handleForwardClick={handleForwardClick} 
    //                 toggleItem={toggleItem} 
    //                 handleBackClick={handleBackClick} 
    //                 handleItemClick={handleItemClick}  
    //               />
    //             ): null}
    //         </div>
    //       ) : item.uploaded_file?.length ? (
    //         <FlexBox className='w-20 h-20'>
    //           <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
    //             <BsFiletypePdf size={60} color='#ff4d4d' />
    //             <Text className='text-[#333] text-[12px] whitespace-pre-wrap break-words w-[100px] text-center'>
    //              tet
    //             </Text>
    //           </FlexBoxInner>
    //         </FlexBox>
    //       ) : null}
    //     </React.Fragment>
    //   ))}
    // </FlexBoxInner>



