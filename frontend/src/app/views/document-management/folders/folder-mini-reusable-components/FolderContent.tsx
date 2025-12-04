import React, {useState} from 'react'
import { useGetAllRolesQuery } from '../../../../../iam/features/roleAPI';
import { FolderDataInterface, UploadedDocumentInterface } from '../../../../models/folder-models';
import { FlexBox, FlexBoxInner, Text, Div } from '../../../../../components/common/StyledComponent';
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
  openStates?: boolean[];
  toggleItem?: (index: number) => void;
  handleForwardClick?: () => void;
  handleBackClick?: () => void;
  
}
interface FolderContentProps {
  folder_data: FolderDataInterface[];
  handleItemClick: (folder: FolderDataInterface) => void;
}

const FolderContent = ({ folder_data, handleItemClick }: FolderProps) => {
 

 

  // Local state to track which folder's documents are visible
  const [visibleDocuments, setVisibleDocuments] = useState<{ [key: string]: boolean }>({});

  const toggleDocuments = (folderId: string) => {
      setVisibleDocuments((prev) => ({
          ...prev,
          [folderId]: !prev[folderId], // Toggle visibility for this folder's documents
      }));
  };

  if (!folder_data || folder_data.length === 0) return null;

  return (
    
    // <FlexBoxInner className='flex flex-col relative'>
    //     {
    //         folder_data.map((item, index) => (
    //             <React.Fragment key={item.folder_identifier}>
    //                 {/* Display folders */}
    //                 {
    //                     item.folder_name && (
    //                         <FlexBox className="mx-5 border-b hover:bg-gray-100 cursor-pointer" onDoubleClick={() => handleItemClick(item)}>
    //                             <FlexBoxInner className='flex justify-between items-center py-[5px] pr-10'>
    //                                 <Div className='flex items-center space-x-4 cursor-pointer w-[20%]'>
    //                                     <AiFillFolder size={50} color='#f8d775' />
    //                                     <Text className='text-[#333] text-[12px] whitespace-pre-wrap text-nowrap text-center'>
    //                                         {item.folder_name}
    //                                     </Text>
    //                                 </Div>
    //                                 <Div className='flex justify-start w-[20%]'>
    //                                     <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>
    //                                         {item.subfolder?.length} items
    //                                     </Text>
    //                                 </Div>
    //                                 <Div className='flex space-x-5'>
    //                                     <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Size</Text>
    //                                     <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>Modified Date</Text>
    //                                 </Div>
    //                             </FlexBoxInner>
    //                         </FlexBox>
    //                     )}

    //                      {/* Display Documents */}
    //                      {item.documents && item.documents.length > 0 && (
    //                         <FlexBox className="mx-5 border-t pt-2">
    //                             <Text className="font-bold text-[#333] text-[14px]">Documents:</Text>
    //                             <FlexBoxInner className="flex flex-col space-y-2">
    //                                 {item.documents.map(doc => (
    //                                     <Div key={doc.document_information_id} className="flex justify-between items-center border-b py-2">
    //                                         <Text className='text-[#333] text-[12px]'>
    //                                             {doc.document_name}
    //                                         </Text>
    //                                         <a href={doc.current_version.uploaded_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
    //                                             View / Download
    //                                         </a>
    //                                     </Div>
    //                                 ))}
    //                             </FlexBoxInner>
    //                         </FlexBox>
    //                     )}

                   
    //             </React.Fragment>
    //         ))
    //     }
    // </FlexBoxInner>
    <FlexBoxInner className='flex flex-col relative'>
            {
                folder_data.map((item, index) => (
                    <React.Fragment key={item.folder_identifier}>
                    {/* Display folders */}
                    {item.folder_name && (
                        <div
                            className="mx-5 border-b hover:bg-gray-100 cursor-pointer"
                            onDoubleClick={() => handleItemClick(item)}
                        >
                            <div className='flex justify-between items-center py-[5px] pr-10'>
                                <div className='flex items-center space-x-4 cursor-pointer w-[20%]' onClick={() => toggleDocuments(item.folder_identifier)}>
                                    {
                                        AiFillFolder({
                                            size: 50,
                                            color: '#f8d775'
                                        })
                                        
                                    }
                                    <span className='text-[#333] text-[12px] whitespace-pre-wrap text-nowrap text-center'>
                                        {item.folder_name}
                                    </span>
                                </div>
                                <div className='flex justify-start w-[20%]'>
                                    <span className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px]'>
                                        {item.subfolder?.length} items
                                    </span>
                                </div>
                                <div className='flex space-x-5'>
                                    <span className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px]'>Size</span>
                                    <span className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px]'>Modified Date</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conditionally render documents if visible */}
                    {visibleDocuments[item.folder_identifier] && item.documents && item.documents.length > 0 && (
                        <div className="mx-5 border-t pt-2">
                            <span className="font-bold text-[#333] text-[14px]">Documents:</span>
                            <div className="flex flex-col space-y-2">
                                {item.documents.map(doc => (
                                    <div key={doc.document_information_id} className="flex justify-between items-center border-b py-2">
                                        <span className='text-[#333] text-[12px]'>
                                            {doc.document_name}
                                        </span>
                                        <a href={doc.current_version.uploaded_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                            View / Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
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



