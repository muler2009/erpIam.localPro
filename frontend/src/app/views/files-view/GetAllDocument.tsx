import React from 'react'
import * as BsIcons  from "react-icons/bs";
import * as AiIcons  from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as TfiIcons from "react-icons/tfi";
import * as IoIcons from 'react-icons/io5'
import {format} from 'date-fns'
import { useGetDocumentQuery } from '../../services/fileAPISlice'
import { FlexBox, FlexBoxInner,Text, Div } from '../../../components/common/StyledComponent'
import useFolderAndFileExplorerActions from '../../hooks/useFolderAndFileExplorerActions'
import PdfReader from '../../components/common/PDFReader';
import BottomTooltip from '../../../components/common/BottomTooltip';


const GetAllDocument = () => {
    const {data: document_file} = useGetDocumentQuery()
    const {toggleItem, openStates} = useFolderAndFileExplorerActions()
  return (
    <FlexBox className=''>
        {
            document_file?.map((document, index) => {
                if (document.folder === null) {  // Correct condition to filter documents without a folder
                    const created_at = document.created_at ? new Date(document.created_at) : new Date(); // Ensure it's a valid Date object
                
                    return (
                        <FlexBox className='border-b px-5 hover:bg-gray-100 cursor-pointer group' key={index} onDoubleClick={() => toggleItem(index)}>
                            <FlexBoxInner className='flex justify-between items-center py-[5px] pr-10'>
                                <Div className='flex space-x-4 py-1 w-[30%]'>
                                    {/* File icon */}
                                    <BsIcons.BsFiletypePdf size={30} color='red' />
                                    <FlexBoxInner className='flex flex-col'>
                                        <Text className='text-[#333] text-[12px] whitespace-pre-wrap text-nowrap text-center'>
                                            {document.document_name}
                                        </Text>
                                        {/* Owner of the file */}
                                        <p className='text-[10px] text-[#333] text-opacity-70'>Owner of the file</p>
                                    </FlexBoxInner>
                                </Div>

                                <Div className='flex space-x-5 justify-start'>
                                    <Text className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px] group-hover:opacity-0'>PDF file</Text>
                                    <Text className='font-IBMPlexSans text-[#333] text-opacity-75 text-[13px] group-hover:opacity-0'>{format(created_at, 'EE dd yyyy')}</Text>
                                    <div className='flex space-x-3 absolute opacity-0 group-hover:opacity-100'  onClick={() => alert(`share ${document.document_name}`)}>
                                        <BottomTooltip content='share'><AiIcons.AiOutlineShareAlt className='inline-block mr-1 text-gray-600' /></BottomTooltip>
                                        <BottomTooltip content='Archive'><FaIcons.FaFileArchive className='inline-block mr-1 text-gray-600' /></BottomTooltip>
                                        <BottomTooltip content='Download'><TfiIcons.TfiDownload className='inline-block mr-1 text-gray-600' /></BottomTooltip>
                                        <BottomTooltip content='Delete'><IoIcons.IoTrashOutline className='inline-block mr-1 text-gray-600' /></BottomTooltip>
                                    </div>
                                  
                                </Div>
                            </FlexBoxInner>
                            {
                                openStates[index] && <PdfReader pdfURL={`${document.current_version.uploaded_file}`} openPdfs={openStates[index]} setOpenPdfs={() => toggleItem(index)} title={`text`} />
                            }
                        </FlexBox>
                    );                                
                }
                return null; 
            })
        }
    </FlexBox>
  )
}

export default GetAllDocument