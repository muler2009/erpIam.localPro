import { useState, useEffect } from 'react';
import React from 'react'
import { pdfjs } from 'react-pdf';
import { FlexInnerContainer, FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { AiFillFolder } from "react-icons/ai";
import {format} from 'date-fns'
import { FaFilePdf } from "react-icons/fa";
import { BASE_URL } from '../../../../config/config';
import PdfReader from '../../../components/common/PDFReader';
import ModalTest from './ModalTest';


interface FolderGridViewInterface {
  folder_data: any
}

export const FolderGridView = ({folder_data} : FolderGridViewInterface) => {
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const [openPdfs, setOpenPdfs] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(folder_data?.uploaded_file)) {
      setOpenStates(new Array(folder_data.uploaded_file.length).fill(false));
    }
  }, [folder_data]);

  const toggleItem = (index: number) => {
    setOpenStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  if (!folder_data || !Array.isArray(folder_data.uploaded_file)) {
    return <div>No folder data available</div>;
  }
  return (
    <FlexInnerContainer className='flex gap-3 flex-wrap '>
        {
            folder_data.subfolder.map((subfolder: any, index:any) => {
                return(
                <FlexBox className='w-20 h-20' key={index}>
                    <FlexBoxInner className='flex flex-col justify-center items-center '>
                        <AiFillFolder size={80} />
                        <Text className='text-[#333] text-nowrap text-[12px]'>
                            {subfolder.folder_name}
                        </Text>
                    </FlexBoxInner>
                </FlexBox>
                )
            }) 
            }

              <>
                {
                  folder_data.uploaded_file.map((uploaded: any, index: any) => {
                    const createdDate = uploaded.uploaded_file_date
                    return(
                      <FlexBox className='flex justify-between items-center border-b border-gray-100 ' key={index} >
                        <FlexBoxInner className='flex flex-col' onDoubleClick={() => toggleItem(index)}>
                          <FaFilePdf size={30} color='#de2429' className='w-20 h-20'/>
                          <Text className='flex items-center justify-center'>{uploaded.uploaded_document_name}</Text>
                        </FlexBoxInner>
                       
                        {
                          openStates[index] && 
                          <PdfReader 
                              pdfURL={`${uploaded.file_url}`}  
                              openPdfs={openStates[index]} 
                              setOpenPdfs={(value) => toggleItem(index)} title={`text`} 
                          />
                        }

                      
                    </FlexBox>
                    )
                  })
                }
              </>
        

    </FlexInnerContainer>
  )
}


export const FolderListView = ({folder_data} : FolderGridViewInterface) => {
  
    const [openStates, setOpenStates] = useState<boolean[]>([]);
    const [openPdfs, setOpenPdfs] = useState<boolean>(false);

    useEffect(() => {
      if (Array.isArray(folder_data?.uploaded_file)) {
        setOpenStates(new Array(folder_data.uploaded_file.length).fill(false));
      }
    }, [folder_data]);
  
    const toggleItem = (index: number) => {
      setOpenStates((prevState) => {
        const updatedStates = [...prevState];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    };
  
    if (!folder_data || !Array.isArray(folder_data.uploaded_file)) {
      return <div>No folder data available</div>;
    }


    return (
      <FlexInnerContainer className='flex flex-col gap-3'>
        <FlexBox className='flex justify-between items-center '>
            <FlexBoxInner className='flex justify-start items-center space-x-2'>
                <Text className='font-bold text-[#333] text-opacity-60'>Name</Text>
            </FlexBoxInner>
            <FlexBoxInner className='flex justify-start items-center space-x-2'>
                <Text className='font-bold text-[#333] text-opacity-60'>File Type</Text>
            </FlexBoxInner>
            <FlexBoxInner className='flex gap-5'>
                <Text className='text-[#333] text-opacity-60 text-[12px]'>Items</Text>
                <Text className='text-[#333] text-opacity-60'>Modified date</Text>
            </FlexBoxInner>
        </FlexBox>


          {
              folder_data.subfolder.map((subfolder:any, index:any) => {
                const createdDate = subfolder.folder_created_date
                  return(
                  <FlexBox className='flex justify-between items-center border-b border-gray-100' key={index}>
                      <FlexBoxInner className='flex justify-start items-center space-x-2'>
                        <AiFillFolder size={30} />
                        <Text className=''>
                            {subfolder.folder_name}
                        </Text>
                      </FlexBoxInner>
                      <FlexBoxInner className='flex justify-start items-center space-x-2'>
                          <Text className='text-[#333] text-opacity-60'>
                            {
                              subfolder.folder_name && "Folder" 
                            }
                          </Text>
                      </FlexBoxInner>
                      <FlexBoxInner className='flex gap-5'>
                         <Text className='text-[#333] text-opacity-50 text-[12px] '>
                            {subfolder.subfolder.length} items
                        </Text>
                        <Text className='text-[#333] text-opacity-50 '>
                            {format(createdDate, 'EEE dd yyyy')}
                            {subfolder.subfolder?.folder_created_date}
                        </Text>
                      </FlexBoxInner>
                    </FlexBox> 
                  )
                }) 
              }

              <>
                {
                  folder_data.uploaded_file.map((uploaded: any, index: any) => {
                    const createdDate = uploaded.uploaded_file_date
                    return(
                      <FlexBox className='flex justify-between items-center border-b border-gray-100 ' key={index} >
                        <FlexBoxInner className='flex justify-start items-center space-x-2'>
                          <FaFilePdf size={30} color='#de2429'/>
                          <Text className=''>{uploaded.uploaded_document_name}</Text>
                        </FlexBoxInner>
                        <FlexBoxInner className='flex justify-start items-center space-x-2'>
                            <Text className='text-[#333] text-opacity-60'>{ uploaded.uploaded_document_name && "Pdf" }</Text>
                        </FlexBoxInner>
                        <FlexBoxInner className='flex gap-5'>
                          <Text className='text-[#333] text-opacity-50 text-[12px] '>
                              {/* {uploaded.subfolder.length} items */}
                          </Text>
                          <Text className='text-[#333] text-opacity-50 '>{format(createdDate, 'EEE dd yyyy')} {uploaded.uploaded?.folder_created_date} </Text>
                        </FlexBoxInner>
                        
                        <FlexBoxInner>
                          <Text className='' onClick={() => toggleItem(index)}>View pdf</Text>
                         
                        </FlexBoxInner>
                        {
                          openStates[index] && <PdfReader pdfURL={`${uploaded.file_url}`}  openPdfs={openStates[index]} setOpenPdfs={(value) => toggleItem(index)} title={`text`} />
                        }

                      
                    </FlexBox>
                    )
                  })
                }
              </>
      </FlexInnerContainer>
    )
  }

// export default ListGridView

