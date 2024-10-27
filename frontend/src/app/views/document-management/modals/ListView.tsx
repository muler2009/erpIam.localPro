import React, {useState} from 'react'
import useFolderExplorerActions from '../../../hooks/useFolderExplorerActions';
import { FolderGridViewInterface } from '../../../models/folder-models';
import { FlexBox, FlexBoxInner, FlexInnerContainer, Text } from '../../../../components/common/StyledComponent';
import { AiFillFolder } from 'react-icons/ai';
import {format} from 'date-fns'
import PdfReader from '../../../components/common/PDFReader';
import { FaFilePdf } from 'react-icons/fa';

const FolderListView = ({folder_data} : FolderGridViewInterface) => {

    const { currentPath, setCurrentPath, handleBackClick, handleItemClick, currentFolder, getBreadcrumbs } = useFolderExplorerActions(folder_data)
    const [openStates, setOpenStates] = useState<boolean[]>([]);
    const [openPdfs, setOpenPdfs] = useState<boolean>(false);

    const renderBreadcrumbs = () => {
      const breadcrumbs = getBreadcrumbs();
      console.log(breadcrumbs)
      return (
        <div className="flex">
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <span 
                onClick={() => setCurrentPath(currentPath.slice(0, index))}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {item.folder_name}
              </span>
              {index < breadcrumbs.length - 1 && ' > '} 
            </span>
          ))}
        </div>
      );
    };
    const toggleItem = (index: number) => {
      setOpenStates((prevState) => {
        const updatedStates = [...prevState];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    };
  
    return (
      <FlexInnerContainer className='flex flex-col gap-3'>
         

        <FlexBox>
          {renderBreadcrumbs()}
        </FlexBox>

        <FlexBox className='flex justify-between items-center px-5 '>
            <FlexBoxInner className='flex justify-start items-center space-x-2'>
                <Text className='font-bold text-[#333] text-opacity-60'>Name</Text>
            </FlexBoxInner>
            <FlexBoxInner className='flex justify-start items-center space-x-2'>
                <Text className='font-bold text-[#333] text-opacity-60'>File Type</Text>
            </FlexBoxInner>
            <FlexBoxInner className='flex gap-9'>
                <Text className='text-[#333] text-opacity-60 text-[12px]'>Items</Text>
                <Text className='text-[#333] text-opacity-60'>Modified date</Text>
            </FlexBoxInner>
        </FlexBox>

        <FlexBox className='flex flex-col  justify-center gap-2 px-5'>

          {/* A section that display the folders recurrsively  */}
          {
            currentFolder.subfolder?.length ? (
              currentFolder.subfolder?.map((subfolder, index) => {
                const createdDate = subfolder.folder_created_date || new Date()
                  return(
                  <FlexBox className='flex justify-between items-center border-gray-100' key={subfolder.folder_identifier} onClick={() => handleItemClick(subfolder)}>
                      <FlexBoxInner className='flex justify-start items-center space-x-2'>
                        <AiFillFolder size={30} />
                        <Text className=''>{subfolder.folder_name}</Text>
                      </FlexBoxInner>
                      <FlexBoxInner className='flex justify-start items-center space-x-2'>
                          <Text className='text-[#333] text-opacity-60'>
                            { 
                            subfolder.folder_name && "Folder" }
                          </Text>
                      </FlexBoxInner>
                      <FlexBoxInner className='flex gap-9'>
                         <Text className='text-[#333] text-opacity-50 text-[12px] '>
                            {subfolder.subfolder?.length} items
                        </Text>
                        <Text className='text-[#333] text-opacity-50 '>
                            {format(createdDate, 'EEE dd yyyy')}
                            {subfolder.folder_created_date}
                        </Text>
                      </FlexBoxInner>
                    </FlexBox> 
                  )
                }) 
              ) : (
                <FlexBox className='flex justify-center items-center'>
                  <Text className=''>No Items Found</Text>
                </FlexBox>
              )
            }

            {/* a section display the uploaded files and images   */}
            {
              currentFolder.uploaded_file?.map((uploaded: any, index: any) => {
                const createdDate = uploaded.uploaded_file_date
                return(
                  <FlexBox className='flex justify-between items-center border-gray-100 ' key={index} >
                    <FlexBoxInner className='flex justify-start items-center space-x-2' onDoubleClick={() => toggleItem(index)}>
                      <FaFilePdf size={30} color='#de2429'/>
                      <Text className=''>{uploaded.uploaded_document_name}</Text>
                    </FlexBoxInner>
                    <FlexBoxInner className='flex justify-start items-center'>
                      {uploaded.uploaded_document_name && 'File'}
                    </FlexBoxInner>
                    
                    {
                      openStates[index] && <PdfReader pdfURL={`${uploaded.file_url}`}  openPdfs={openStates[index]} setOpenPdfs={(value) => toggleItem(index)} title={`text`} />
                    }   
                </FlexBox>
                )
              })
            }
        </FlexBox>        
      </FlexInnerContainer>
    )
  }

  export default FolderListView