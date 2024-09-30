import React, {useState} from 'react'
import { FolderDataInterface, UploadedDocumentInterface } from '../../../../models/folder-models';
import { FlexBox, FlexBoxInner, Text, P } from '../../../../../components/common/StyledComponent';
import { format } from 'date-fns';

import { AiFillFolder, AiFillFile } from 'react-icons/ai';

interface FolderProps {
  folder_data: any;
  handleItemClick: (folder: any) => void;
  openStates: boolean[];
  toggleItem: (index: number) => void;
  handleForwardClick: () => void;
  handleBackClick: () => void;
  
}

const Folder = ({ folder_data, handleItemClick, openStates, toggleItem, handleBackClick, handleForwardClick }: FolderProps) => {
  return (
    <FlexBox className='pt-2'>
      <FlexBoxInner className='flex flex-col relative mx-5'>        
        {
            folder_data?.map((folder: FolderDataInterface, index: number) => {
              const created_at = folder.folder_created_date || new Date()
              const updated_at = folder.folder_updated_date || new Date()

              return(
                <FlexBox className='border-b hover:bg-gray-100 cursor-pointer' key={index} onDoubleClick={() =>handleItemClick(folder)}>
                  <FlexBox className='flex justify-between items-center py-[5px] pr-10'>                       
                    <FlexBoxInner className='flex items-center space-x-4 cursor-pointer w-[20%]'>
                        <AiFillFolder size={50} color='#f8d775' />
                        <Text className='text-[#333] text-[12px] whitespace-pre-wrap text-nowrap text-center'>
                          {folder.folder_name}
                        </Text>
                    </FlexBoxInner>
  
                    <FlexBox className='w-[20%] flex justify-start'>
                        <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>
                            { folder.subfolder?.length } items
                            
                        </Text>
                    </FlexBox>
                   
                      <FlexBoxInner className='flex space-x-5'>
                          <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>{format(created_at, 'EE dd yyyy')}</Text>
                          <Text className='font-IBMPlexSans  text-[#333] text-opacity-75 text-[13px]'>{format(updated_at, 'EE dd yyyy')}</Text>
                      </FlexBoxInner>
                    
                </FlexBox>
                </FlexBox>
              )
            }    
          )
        }        
      </FlexBoxInner>
    </FlexBox>
  )}

// <FlexBoxInner className='flex items-center cursor-pointer py-[5px]'>
//                     <AiFillFolder size={50} color='#f8d775' />
//                     <Text className='text-[#333] text-[12px] whitespace-nowrap break-words w-[100px] pl-2'>{folder.folder_name}</Text>
//                   </FlexBoxInner>

  





// const FolderItem = () => {
//   return(
//     <FlexBox className='flex flex-col gap-3 relative mb-5 mx-1 mt-5'>
//     {/* {
//       folder_data.some((folder: FolderDataInterface) => folder.uploaded_file?.length) && (
//         <Text className='after:content-[""] after:absolute after:w-[80%] after:h-[1px] after:left-[5.5rem] after:top-[0.75rem] after:bg-gray-100'>Files</Text>
//       )
//     } */}
//     <FlexBoxInner className='flex gap-3 flex-wrap'>

//       {/* {
//         folder_data?.map((folder: FolderDataInterface) => (
//           folder.uploaded_file ? (
//             folder.uploaded_file?.map((uploaded: UploadedDocumentInterface, index: number) => (
//               <FlexBox className='flex justify-between py-3 items-center border-gray-100 cursor-pointer' key={index}>
//                 <FlexBoxInner className='flex space-x-2 justify-start items-center w-13 h-13' onDoubleClick={() => toggleItem(index)}>
//                   <BsFiletypePdf size={40} color='red' />
//                   <FlexBoxInner className='flex flex-col'>
//                     <Text className='text-[13px]'>{uploaded.uploaded_document_name}</Text>
//                     <p className='text-[10px] text-[#333] text-opacity-70'>Owner of the file</p>
//                   </FlexBoxInner>
//                 </FlexBoxInner>

//                 <>
//                   {
//                     openStates[index] && <PdfReader pdfURL={`${uploaded.file_url}`} openPdfs={openStates[index]} setOpenPdfs={() => toggleItem(index)} title={`text`} />
//                   }
                
//                 </>

//               </FlexBox>
//             ))
//           ): null
//         ))
//       } */}

//       test

//     </FlexBoxInner>
//   </FlexBox>
//   )
// }
export default Folder



