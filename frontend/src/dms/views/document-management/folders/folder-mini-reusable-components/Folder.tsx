import React, {useState} from 'react'
import { FolderDataInterface, UploadedDocumentInterface } from '../../../../models/folder-models';
import { FlexBox, FlexBoxInner, Text, P } from '../../../../../components/common/StyledComponent';

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
    <div className='pt-5'>
      <FlexBoxInner className='flex flex-col gap-2 relative mb-5 mx-5'>       
       
          {
            folder_data?.map((folder: FolderDataInterface, index: number) => {

              return(
                <FlexBox className='w-20 h-20' key={index} onDoubleClick={() =>handleItemClick(folder)}>
                  <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
                    <AiFillFolder size={60} color='#f8d775' />
                    <Text className='text-[#333] text-[12px] whitespace-pre-wrap break-words w-[100px] text-center'>
                      {folder.folder_name} 
                    </Text>
                  </FlexBoxInner>
                </FlexBox>
  
              )
            }   
            
          )
          }
        
      </FlexBoxInner>

     
    </div>
  )}

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



